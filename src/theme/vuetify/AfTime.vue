<template>
    <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            :nudge-left="40">
        <v-text-field
                slot="activator"
                :label="label"
                :value="model"
                prepend-icon="access_time"
                readonly
        ></v-text-field>
        <v-time-picker v-model="model" scrollable color="primary"
                       format="24hr"
                       @input="onInput">
        </v-time-picker>
    </v-menu>
</template>

<script>
    export default {
        data() {
            return {
                menu : false,
                model : this.value,
            }
        },
        watch : {
            value(newVal) {
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
                console.log("min", this.schema.min);
                return this.schema.min || undefined
            },
            max() {
                return this.schema.max || undefined
            },
            rules() {
                return []
            },

        },
        methods: {
            onInput (val) {
                this.$emit('input', this.model)
            },
            formatDate(date) {
                return new Date(date).toLocaleDateString()
            }
        },
        beforeMount() {
            if(!this.value && this.schema.defaultValue) {
                this.model = this.schema.defaultValue;
                this.$emit('input', this.model)
            }
        }
    }
</script>
