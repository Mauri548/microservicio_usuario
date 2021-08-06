<template>
    <button class="button">
        <span v-if="positionIcon == 'left'" class="icon" :class="classIcon">
            <i :class="icon"></i>
        </span>
        <span><slot></slot></span>
        <span v-if="positionIcon == 'right'" class="icon" :class="classIcon">
            <i :class="icon"></i>
        </span>
    </button>
</template>

<script>
export default {
    name: 'ButtonIcon',
    props: {
        icon: String,
        positionIcon: {
            type: String,
            default: 'right'
        },
        classIcon: {
            type: String,
            default: 'is-small'
        }
    }
}
</script>

<style>

</style>