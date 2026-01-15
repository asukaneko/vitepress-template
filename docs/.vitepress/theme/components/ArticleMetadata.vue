<script lang="ts" setup>
import { useData } from 'vitepress'
import { computed, ref, onMounted, watch } from 'vue'
import { countWord } from './untils/functions'

const { page } = useData()

const wordCount = ref(0)
const imageCount = ref(0)

const wordTime = computed(() => {
    return ((wordCount.value / 275) * 60)
})

const imageTime = computed(() => {
    const n = imageCount.value
    if (imageCount.value <= 10) {
        return n * 13 + (n * (n - 1)) / 2
    }
    return 175 + (n - 10) * 3
})

// 阅读时间
const readTime = computed(() => {
    return Math.ceil((wordTime.value + imageTime.value) / 60)
})

function analyze() {
    const docDomContainer = window.document.querySelector('#VPContent')
    const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
        '.content-container .main img'
    )
    imageCount.value = imgs?.length || 0
    const words = docDomContainer?.querySelector('.content-container .main')?.textContent || ''
    wordCount.value = countWord(words)
}

onMounted(() => {
    analyze()
})

// 监听路由变化，重新计算
watch(() => page.value.relativePath, () => {
    setTimeout(analyze, 500) // 延迟执行确保内容已渲染
})
</script>

<template>
    <div class="article-metadata">
        <div class="metadata-item">
            <span class="metadata-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
            </span>
            <span class="metadata-label">字数</span>
            <span class="metadata-value">{{ wordCount }} 字</span>
        </div>
        <div class="metadata-item">
            <span class="metadata-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </span>
            <span class="metadata-label">阅读时间</span>
            <span class="metadata-value">{{ readTime }} 分钟</span>
        </div>
    </div>
</template>

<style scoped>
.article-metadata {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 0;
    color: var(--vp-c-text-2);
    font-size: 14px;
    border-bottom: 1px solid var(--vp-c-divider);
    margin-bottom: 20px;
}

.metadata-item {
    display: flex;
    align-items: center;
    gap: 12px;
}

.metadata-icon {
    display: flex;
    align-items: center;
    color: var(--vp-c-text-3);
    width: 20px;
}

.metadata-label {
    width: 60px;
}

.metadata-value {
    color: var(--vp-c-text-1);
}
</style>
