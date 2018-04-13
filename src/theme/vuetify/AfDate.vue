<template>
    <div>
        <label class="subheading">{{label}}</label>
        <v-date-picker
                v-model="model"
                :locale="locale"
                :min="min"
                :max="max"
                @input="onInput"
                reactive
                landscape ></v-date-picker>
    </div>

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
                type: String
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
            min() {
                return this.schema.min || undefined
            },
            max() {
                return this.schema.max || undefined
            },
            rules() {
                return []
            }
        },
        methods: {
            onInput (val) {
                let date = new Date(val);
                this.$emit('input', date.toJSON())
            }
        },
        mounted() {
            if(!this.value && this.schema.defaultValue) {
                this.model = this.schema.defaultValue;
                this.$emit('input', this.model)
            }
        }
    }
</script>
