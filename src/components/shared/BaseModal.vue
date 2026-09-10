<template>
    <div
        class="modal-backdrop"
        :class="{ hidden: !modelValue }"
        @click.self="$emit('close')"
    >
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header">
                    <h3 class="modal-title">{{ title }}</h3>
                </slot>
                <button class="btn-close-modal" @click="$emit('close')">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="modal-body">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: boolean
    title?: string
}>()

defineEmits<{
    close: []
}>()
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(4px);
    z-index: 2000;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.modal-backdrop.hidden {
    display: none;
}

.modal-content {
    background-color: var(--color-bg-surface);
    width: 100%;
    max-width: 600px;
    border-radius: 20px 20px 0 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 80vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 12px;
}

.modal-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--color-text-main);
}

.btn-close-modal {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s ease;
}

.btn-close-modal:hover {
    background-color: var(--color-bg-app);
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

@media (min-width: 640px) {
    .modal-content {
        border-radius: 20px;
        align-items: center;
    }
}
</style>
