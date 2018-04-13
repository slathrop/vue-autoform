<template>
    <v-checkbox
            color="primary"
            :label="label"
            v-model="model"
            :rules="rules"
            @input="onInput"
    ></v-checkbox>
</template>

<script>
    export default {
        data() {
            return {
                model : this.value
            }
        },
        watch : {
            value() {
                this.model = this.value;
            }
        },
        props: {
            value : {
                type: Boolean
            },
            schema: {
                type: Object,
                required: true
            },
            locale: {
                type: String,
                default : 'en-us'
            }
        },
        computed: {
            label() {
                return this.schema.label || this.schema.name;
            },
            rules() {
                return []
            }
        },
        methods: {
            onInput (e) {
                this.$emit('input', this.value)
            }
        },
        mounted() {
            if(!this.value && this.schema.defaultValue) {
                this.model = this.schema.defaultValue
            }
        }
    }
</script>
