<template>
    <v-text-field
            :label="label"
            :multi-line="multiline"
            :rows="rows"
            :type="inputType"
            :rules="rules"
            :counter="counter"
            :suffix="schema.suffix"
            :prefix="schema.prefix"
            v-model="model"
            @input="$emit('input', $event)"
    ></v-text-field>
</template>

<script>
    import Locale from '../../locales';
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
            multiline(){
                return this.rows > 1;
            },
            rows() {
                return this.schema.rows || 1;
            },
            inputType() {
                return this.schema.inputType || "text";
            },
            counter() {
                return this.schema.max || undefined;
            },
            rules() {
                let messages = Locale[this.locale];
                let items = [];
                if(this.schema.max) {
                    items.push( (v) => v.length <= this.schema.max || Locale.format(messages.maxCount, this.schema.max) )
                }
                if(this.schema.min) {
                    items.push( (v) => v.length >= this.schema.min || Locale.format(messages.minCount, this.schema.min) )
                }
                if(this.schema.regEx) {
                    items.push( (v) => this.schema.regEx.test(v) || Locale.format(messages.notAllowed, this.schema.v) )
                }
                return items
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
