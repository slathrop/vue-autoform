<template>
    <form ref="form" @submit="onFormSubmit">
        <af-field v-for="(sch, index) in schema"
                    :key="index"
                    v-model="model[sch.name]"
                    :schema="sch"
                    @input="$emit('input', model)"
                    :theme="theme"
                    :locale="locale">
        </af-field>
    </form>
</template>

<script>
    import AfField from './AfField';
    export default {
        name : 'af-form',
        components : {
            AfField
        },
        watch : {
            value() {
                this.model = this.value;
            }
        },
        data () {
            return {
                keyIndex : 0,
                model : this.value,
                errors: {}
            }
        },
        props: {
            value : {
                type : Object,
                default : {}
            },
            theme: {
                type: String,
                default : 'vuetify'
            },
            locale: {
                type: String,
                default : 'en-us'
            },
            schema: {
                type: Array,
                required: true
            },
        },
        methods: {
            onFormSubmit(e) {
                this.$emit('submit',e);
            }
        },
    }
</script>
<style scoped>

</style>
