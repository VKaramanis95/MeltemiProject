<template>
  <Teleport to="body">
  <div
    v-show="chatbot_enabled"
    class="localizebot"
    :style="{ '--localizebot-brand-color': brand_color }"
  >
    <Transition name="lb-pop" mode="out-in">
      <button
        v-if="!is_open"
        key="launcher"
        class="localizebot_launcher"
        type="button"
        aria-label="Open chat"
        @click="is_open = true"
      >
        <Icon name="message-circle" size="22" stroke="2" class="localizebot_launcher_icon" />
        <span class="localizebot_launcher_label">{{ launcher_label }}</span>
      </button>

      <section
        v-else
        key="window"
        class="localizebot_window"
        role="dialog"
        aria-modal="true"
        :aria-label="assistant_name"
      >
        <header class="localizebot_header">
          <div class="localizebot_identity">
            <span class="localizebot_avatar_wrap">
              <span class="localizebot_avatar">M</span>
              <span class="localizebot_status_dot" aria-hidden="true"></span>
            </span>

            <div>
              <strong>{{ assistant_name }}</strong>
              <span>{{ status_label }}</span>
            </div>
          </div>

          <button
            class="localizebot_close"
            type="button"
            aria-label="Close chat"
            @click="is_open = false"
          >
            <Icon name="x" size="18" stroke="2" />
          </button>
        </header>

        <main ref="messages_element" class="localizebot_messages">
          <div class="localizebot_message localizebot_message_assistant">
            {{ welcome_message }}
          </div>

          <button
            v-for="question in quick_questions"
            :key="question"
            class="localizebot_quick_question"
            type="button"
            :disabled="is_loading"
            @click="send_question(question)"
          >
            {{ question }}
          </button>

          <TransitionGroup name="lb-msg">
            <div
              v-for="message in messages"
              :key="message.id"
              class="localizebot_message"
              :class="message.role === 'user'
                ? 'localizebot_message_user'
                : 'localizebot_message_assistant'"
            >
              {{ message.text }}
            </div>
          </TransitionGroup>

          <div
            v-if="is_loading"
            class="localizebot_message localizebot_message_assistant localizebot_typing"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </main>

        <form class="localizebot_form" @submit.prevent="send_question(question)">
          <input
            v-model="question"
            type="text"
            :placeholder="input_placeholder"
            :disabled="is_loading"
            maxlength="1000"
          >

          <button
            type="submit"
            :disabled="is_loading || !question.trim()"
            aria-label="Send message"
          >
            <Icon name="arrow-up" size="18" stroke="2.5" />
          </button>
        </form>
      </section>
    </Transition>
  </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'

type ChatMessage = {
  id: number
  role: 'user' | 'assistant'
  text: string
}

type WidgetConfig = {
  chatbot_enabled: boolean
  assistant_name: string
  brand_color: string
  welcome_message: string
  quick_questions: string[]
}

const runtime_config = useRuntimeConfig()
const { locale } = useI18n()

const is_open = ref(false)
const is_loading = ref(false)
const question = ref('')
const messages = ref<ChatMessage[]>([])
const messages_element = ref<HTMLElement | null>(null)
const widget_config = ref<WidgetConfig | null>(null)

const api_base_url = runtime_config.public.localizebotApiBaseUrl
const website_key = runtime_config.public.localizebotWebsiteKey

// Fallbacks only — used if the widget-config fetch fails or the backend
// hasn't set custom copy for this tenant yet. Swapped from the dental-clinic
// defaults to car-rental-relevant ones so there's never a mismatched
// placeholder visible if the API call doesn't return in time.
const default_welcome_message = computed(() =>
  locale.value === 'el'
    ? 'Γεια σας! Πώς μπορούμε να σας βοηθήσουμε με την ενοικίαση;'
    : 'Hello! How can we help with your car rental?',
)

const default_quick_questions = computed(() =>
  locale.value === 'el'
    ? [
        'Τι περιλαμβάνει η τιμή;',
        'Κάνετε παράδοση στο αεροδρόμιο;',
        'Χρειάζομαι εγγύηση/κατάθεση;',
      ]
    : [
        'What does the price include?',
        'Do you deliver to the airport?',
        'Do you need a deposit?',
      ],
)

const chatbot_enabled = computed(
  () => widget_config.value?.chatbot_enabled ?? true,
)

// Hardcoded rather than sourced from widget_config: the LocalizeBot admin
// panel's tenant config is currently sending back a generic "Website
// Assistant" name, which isn't what's wanted here — so this always shows
// "Meltemi Assistant" regardless of what the API returns. If the tenant
// name is ever fixed on the LocalizeBot backend side, this line can go back
// to `widget_config.value?.assistant_name || 'Meltemi Assistant'`.
const assistant_name = computed(() => 'Meltemi Assistant')

// Falls back to the site's --navy token rather than a hardcoded hex, so it
// stays in sync with main.css if the palette ever changes.
const brand_color = computed(
  () => widget_config.value?.brand_color || 'var(--navy)',
)

const launcher_label = computed(() =>
  locale.value === 'el' ? 'Ρωτήστε μας' : 'Chat with us',
)

const status_label = computed(() =>
  locale.value === 'el' ? 'Online' : 'Online',
)

const welcome_message = computed(
  () => widget_config.value?.welcome_message || default_welcome_message.value,
)

const input_placeholder = computed(() =>
  locale.value === 'el'
    ? 'Γράψτε την ερώτησή σας...'
    : 'Type your question...',
)

const quick_questions = computed(
  () => widget_config.value?.quick_questions?.length
    ? widget_config.value.quick_questions
    : default_quick_questions.value,
)

const load_widget_config = async () => {
  try {
    const response = await $fetch<WidgetConfig>(
      `${api_base_url}/v1/public/widget-config`,
      {
        headers: {
          'X-Website-Key': website_key,
        },
        query: {
          language: locale.value,
        },
      },
    )

    widget_config.value = response

    if (!response.chatbot_enabled) {
      is_open.value = false
    }
  } catch {
    widget_config.value = null
  }
}

function get_question_language(question: string) {
  return /[Ͱ-Ͽἀ-῿]/.test(question) ? 'el' : 'en'
}

watch(locale, async () => {
  messages.value = []
  question.value = ''
  is_loading.value = false

  await load_widget_config()
})

onMounted(() => {
  void load_widget_config()
})

const scroll_to_bottom = async () => {
  await nextTick()

  if (messages_element.value) {
    messages_element.value.scrollTop = messages_element.value.scrollHeight
  }
}

const send_question = async (question_text: string) => {
  const clean_question = question_text.trim()

  if (!clean_question || is_loading.value) {
    return
  }

  messages.value.push({
    id: Date.now(),
    role: 'user',
    text: clean_question,
  })

  question.value = ''
  is_loading.value = true
  await scroll_to_bottom()

  try {
    const response = await $fetch<{ answer: string }>(
      `${api_base_url}/v1/public/chat`,
      {
        method: 'POST',
        headers: {
          'X-Website-Key': website_key,
        },
        body: {
          question: clean_question,
          language: get_question_language(clean_question),
        },
      },
    )

    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      text: response.answer,
    })
  } catch {
    messages.value.push({
      id: Date.now() + 1,
      role: 'assistant',
      text: locale.value === 'el'
        ? 'Παρουσιάστηκε προσωρινό πρόβλημα. Παρακαλούμε προσπαθήστε ξανά.'
        : 'A temporary problem occurred. Please try again.',
    })
  } finally {
    is_loading.value = false
    await scroll_to_bottom()
  }
}
</script>

<style scoped>

.localizebot{
	position:fixed;
	right:20px;
	bottom:20px;
	z-index:9998;
	font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}


@media (max-width: 899px) {
	.localizebot_launcher,
	.localizebot_window {
		margin-bottom: calc(4rem + 12px);
	}
}

.localizebot_launcher{
	position:relative;
	display:flex;
	align-items:center;
	justify-content:center;
	gap:8px;
	border:0;
	border-radius:999px;
	padding:13px 18px;
	color:#ffffff;
	background:var(--localizebot-brand-color);
	box-shadow:0 10px 26px -4px rgba(0,0,0,.28),0 2px 8px rgba(0,0,0,.14);
	cursor:pointer;
	font-size:13px;
	font-weight:700;
	transition:transform .2s ease,box-shadow .2s ease;
	animation:localizebot_launcher_in .35s ease both;
}

.localizebot_launcher:hover{
	transform:translateY(-2px);
	box-shadow:0 14px 32px -4px rgba(0,0,0,.32),0 4px 10px rgba(0,0,0,.16);
}

.localizebot_launcher:focus-visible,
.localizebot_close:focus-visible,
.localizebot_quick_question:focus-visible,
.localizebot_form input:focus-visible,
.localizebot_form button:focus-visible{
	outline:2px solid var(--localizebot-brand-color);
	outline-offset:2px;
}


.localizebot_launcher_icon{
	flex:none;
}

.localizebot_window{
	display:flex;
	flex-direction:column;
	width:min(360px,calc(100vw - 32px));
	height:min(540px,calc(100dvh - 40px));
	overflow:hidden;
	border:1px solid var(--line);
	border-radius:20px;
	background:var(--surface);
	box-shadow:0 24px 60px -12px rgba(0,0,0,.32),0 4px 16px rgba(0,0,0,.1);
	animation:localizebot_window_in .22s cubic-bezier(.2,.8,.3,1) both;
}

.localizebot_header{
	display:flex;
	align-items:center;
	justify-content:space-between;
	min-height:54px;
	padding:10px 14px;
	color:#ffffff;
	background:var(--localizebot-brand-color);
	box-shadow:0 1px 0 rgba(255,255,255,.08) inset;
}

.localizebot_identity{
	display:flex;
	align-items:center;
	min-width:0;
	gap:10px;
}

.localizebot_avatar_wrap{
	position:relative;
	flex:0 0 26px;
}

.localizebot_avatar{
	display:grid;
	width:26px;
	height:26px;
	place-items:center;
	border-radius:50%;
	color:var(--localizebot-brand-color);

	background:linear-gradient(155deg,#ffffff,color-mix(in srgb,var(--localizebot-brand-color) 35%,#ffffff));
	font-size:12px;
	font-weight:800;
}

.localizebot_status_dot{
	position:absolute;
	right:-1px;
	bottom:-1px;
	width:8px;
	height:8px;
	border:1.5px solid var(--localizebot-brand-color);
	border-radius:50%;
	background:#38d97b;
}

.localizebot_identity>div:last-child{
	min-width:0;
}

.localizebot_identity strong,
.localizebot_identity span{
	display:block;
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
}

.localizebot_identity strong{
	font-size:13.5px;
	font-weight:700;
	letter-spacing:.01em;
}

.localizebot_identity span{
	margin-top:2px;
	font-size:11px;
	opacity:.85;
}

.localizebot_close{
	display:grid;
	width:30px;
	height:30px;
	flex:0 0 30px;
	place-items:center;
	border:0;
	border-radius:8px;
	color:#ffffff;
	background:transparent;
	cursor:pointer;
	transition:background .2s ease,transform .2s ease;
}

.localizebot_close:hover{
	background:rgba(255,255,255,.14);
	transform:rotate(90deg);
}

.localizebot_messages{
	display:flex;
	flex:1;
	flex-direction:column;
	gap:8px;
	min-height:0;
	overflow-x:hidden;
	overflow-y:auto;
	padding:16px 14px;
	background:var(--ground);
	scroll-behavior:smooth;
	scrollbar-width:thin;
	scrollbar-color:var(--line) transparent;
}

.localizebot_messages::-webkit-scrollbar{
	width:5px;
}

.localizebot_messages::-webkit-scrollbar-thumb{
	border-radius:999px;
	background:var(--line);
}

.localizebot_message{
	max-width:88%;
	padding:10px 13px;
	font-size:13px;
	line-height:1.45;
	white-space:pre-wrap;
	word-break:break-word;
}

.localizebot_message_assistant{
	align-self:flex-start;
	border-radius:4px 16px 16px 16px;
	color:var(--ink);
	background:var(--surface);
	box-shadow:0 1px 2px rgba(0,0,0,.05),0 2px 8px rgba(0,0,0,.04);
}

.localizebot_message_user{
	align-self:flex-end;
	border-radius:16px 4px 16px 16px;
	color:#ffffff;
	background:var(--localizebot-brand-color);
}

.lb-msg-enter-active{
	transition:opacity .22s ease,transform .22s ease;
}

.lb-msg-enter-from{
	opacity:0;
	transform:translateY(6px);
}

.localizebot_quick_question{
	align-self:flex-start;
	max-width:100%;
	border:1px solid var(--line);
	border-radius:12px;
	padding:9px 12px;
	color:var(--localizebot-brand-color);
	background:var(--surface);
	cursor:pointer;
	font-size:12px;
	font-weight:600;
	line-height:1.35;
	text-align:left;
	transition:border-color .2s ease,background .2s ease,transform .2s ease;
}

.localizebot_quick_question:hover:not(:disabled){
	border-color:var(--localizebot-brand-color);
	background:color-mix(in srgb,var(--localizebot-brand-color) 8%,var(--surface));
	transform:translateY(-1px);
}

.localizebot_quick_question:disabled{
	cursor:not-allowed;
	opacity:.6;
}

.localizebot_typing{
	display:flex;
	gap:4px;
	align-items:center;
	min-width:56px;
	padding:13px;
}

.localizebot_typing span{
	width:6px;
	height:6px;
	border-radius:50%;
	background:var(--ink-soft);
	animation:localizebot_bounce 1s infinite ease-in-out;
}

.localizebot_typing span:nth-child(2){
	animation-delay:.15s;
}

.localizebot_typing span:nth-child(3){
	animation-delay:.3s;
}

.localizebot_form{
	display:flex;
	align-items:center;
	gap:8px;
	padding:11px;
	border-top:1px solid var(--line);
	background:var(--surface);
}

.localizebot_form input{
	flex:1;
	min-width:0;
	height:42px;
	border:1px solid var(--line);
	border-radius:999px;
	padding:0 15px;
	color:var(--ink);
	background:var(--ground);
	outline:none;
	font-size:13px;
	transition:border-color .2s ease,box-shadow .2s ease,background .2s ease;
}

.localizebot_form input::placeholder{
	color:var(--ink-soft);
}

.localizebot_form input:focus{
	border-color:var(--localizebot-brand-color);
	background:var(--surface);
	box-shadow:0 0 0 3px color-mix(in srgb,var(--localizebot-brand-color) 16%,transparent);
}

.localizebot_form input:disabled{
	cursor:not-allowed;
	background:var(--ground);
}

.localizebot_form button{
	display:grid;
	width:38px;
	height:38px;
	flex:0 0 38px;
	place-items:center;
	border:0;
	border-radius:50%;
	color:#ffffff;
	background:var(--localizebot-brand-color);
	cursor:pointer;
	transition:transform .2s ease,opacity .2s ease;
}

.localizebot_form button:hover:not(:disabled){
	transform:translateY(-1px) scale(1.04);
}

.localizebot_form button:disabled{
	cursor:not-allowed;
	opacity:.5;
}

@keyframes localizebot_bounce{
	0%,80%,100%{
		transform:scale(.75);
		opacity:.5;
	}

	40%{
		transform:scale(1);
		opacity:1;
	}
}

@keyframes localizebot_launcher_in{
	from{
		opacity:0;
		transform:translateY(10px) scale(.94);
	}

	to{
		opacity:1;
		transform:translateY(0) scale(1);
	}
}

@keyframes localizebot_window_in{
	from{
		opacity:0;
		transform:translateY(10px) scale(.97);
	}

	to{
		opacity:1;
		transform:translateY(0) scale(1);
	}
}


.lb-pop-enter-active,
.lb-pop-leave-active{
	transition:opacity .12s ease;
}

.lb-pop-enter-from,
.lb-pop-leave-to{
	opacity:0;
}

@media (prefers-reduced-motion: reduce){
	.localizebot_launcher,
	.localizebot_window,
	.localizebot_typing span,
	.lb-msg-enter-active,
	.lb-pop-enter-active,
	.lb-pop-leave-active{
		animation:none !important;
		transition:none !important;
	}
}

@media(max-width:640px){
	.localizebot{
		right:0;
		bottom:0;
	}

	.localizebot_window{
		width:100vw;
		height:100dvh;
		border:0;
		border-radius:0;
		margin-bottom:0; 
	}

	
	.localizebot_launcher{
		width:54px;
		height:54px;
		padding:0;
		margin:0 16px calc(4rem + 12px) 0;
	}

	.localizebot_launcher_label{
		display:none;
	}

	
	.localizebot_launcher_icon{
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
	}
}
</style>