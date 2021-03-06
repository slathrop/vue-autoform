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
                v-model="dateFormatted"
                prepend-icon="event"
                readonly
        ></v-text-field>
        <v-date-picker v-model="model" no-title scrollable :locale="locale" autosave
                       :min="min"
                       :max="max"
                       @input="onInput"
                       reactive
                       :date-format="date => new Date(date).toLocaleDateString()"
                       :formatted-value.sync="dateFormatted">
        </v-date-picker>
    </v-menu>
</template>

<script>
    import moment from 'moment'
    import Locale from '../../locales'
    export default {
        data() {
            return {
                menu : false,
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
            dateFormatted() {
                moment.locale(this.momentLocale);
                let date = moment(new Date(this.model));
                return date.format(Locale[this.locale].dateFormat);
            },
            momentLocale() {
                return this.locale ? this.locale.substring(0,2) : 'en';
            },
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
