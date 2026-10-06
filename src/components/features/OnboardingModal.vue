<script setup lang="ts">
import { computed } from "vue";
import BaseModal from "@/components/shared/BaseModal.vue";
import { useOnboarding } from "@/composables/useOnboarding";

const onboarding = useOnboarding();
const { isOpen, step, steps, close, next, prev } = onboarding;

const currentStep = computed(() => steps[step.value]);
const isFirst = computed(() => step.value === 0);
const isLast = computed(() => step.value === steps.length - 1);
const nextLabel = computed(() => (isLast.value ? "Empezar" : "Siguiente"));
</script>

<template>
    <BaseModal
        :modelValue="isOpen"
        :title="currentStep.title"
        subtitle="Guía rápida de uso"
        @close="close"
    >
        <div class="onboarding-body">
            <div class="onboarding-icon" aria-hidden="true">
                {{ currentStep.icon }}
            </div>
            <p class="onboarding-text">{{ currentStep.text }}</p>
            <ul v-if="currentStep.bullets" class="onboarding-bullets">
                <li v-for="(bullet, i) in currentStep.bullets" :key="i">
                    {{ bullet }}
                </li>
            </ul>
        </div>

        <div class="onboarding-footer">
            <button class="btn-skip" type="button" @click="close">
                Saltar
            </button>
            <div class="onboarding-dots" aria-hidden="true">
                <span
                    v-for="(_, i) in steps"
                    :key="i"
                    class="dot"
                    :class="{ active: i === step }"
                ></span>
            </div>
            <div class="onboarding-nav">
                <button
                    v-if="!isFirst"
                    class="btn-back"
                    type="button"
                    @click="prev"
                >
                    Atrás
                </button>
                <button class="btn-next" type="button" @click="next">
                    {{ nextLabel }}
                </button>
            </div>
        </div>
    </BaseModal>
</template>

<style scoped>
.onboarding-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-bottom: 4px;
}

.onboarding-icon {
    font-size: 2.5rem;
    line-height: 1;
    text-align: center;
}

.onboarding-text {
    color: var(--color-text-main);
    font-size: 0.95rem;
    line-height: 1.5;
    text-align: center;
}

.onboarding-bullets {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    color: var(--color-text-main);
    font-size: 0.88rem;
    line-height: 1.45;
}

.onboarding-bullets li::marker {
    color: var(--color-primary);
    font-weight: 700;
}

.onboarding-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border-top: 1px solid var(--color-border);
    padding-top: 12px;
}

.btn-skip {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    padding: 6px 4px;
}

.btn-skip:hover {
    color: var(--color-text-main);
}

.onboarding-dots {
    display: flex;
    align-items: center;
    gap: 6px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-border);
    transition: background-color 0.2s ease, transform 0.2s ease;
}

.dot.active {
    background-color: var(--color-primary);
    transform: scale(1.2);
}

.onboarding-nav {
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-back {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text-main);
    border-radius: 20px;
    padding: 8px 14px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-back:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
}

.btn-next {
    background-color: var(--color-primary);
    color: #ffffff;
    border: none;
    border-radius: 20px;
    padding: 8px 18px;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: filter 0.2s ease;
    min-width: 100px;
}

.btn-next:hover {
    filter: brightness(0.92);
}

@media (max-width: 480px) {
    .onboarding-footer {
        flex-wrap: wrap;
        justify-content: center;
    }

    .btn-skip {
        order: 2;
    }

    .onboarding-dots {
        order: 1;
        width: 100%;
        justify-content: center;
    }

    .onboarding-nav {
        order: 3;
        width: 100%;
        justify-content: center;
    }

    .btn-next {
        flex: 1;
        max-width: 200px;
    }
}
</style>
