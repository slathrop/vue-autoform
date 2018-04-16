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
                :value="dateFormatted"
                prepend-icon="event"
                readonly
        ></v-text-field>
        <v-container>
            <v-date-picker v-model="dateModel"
                           :locale="locale" autosave
                           scrollable
                           :min="min"
                           :max="max"
                           @input="onInput"
                           reactive
                           :date-format="formatDate"
                           :formatted-value.sync="dateFormatted" color="primary">
            </v-date-picker>
            <v-time-picker v-model="timeModel" scrollable color="primary"
                           format="24hr"
                           @input="onInput">
            </v-time-picker>
        </v-container>

    </v-menu>
</template>

<script>
    import moment from 'moment'
    import Locale from '../../locales'
    export default {
        data() {
            return {
                menuOpen : false,
                model : this.value,
                dateModel : null,
                timeModel : null,
            }
        },
        watch : {
            value(newVal) {
                this.model = this.value;
            },
            dateModel(newVal) {
                moment.locale(this.momentLocale);
                let dateMoment = moment(newVal);
                let modelMoment = moment(this.model);
                modelMoment.year(dateMoment.year());
                modelMoment.month(dateMoment.month());
                modelMoment.date(dateMoment.date());
                this.model = modelMoment.toJSON();
                this.$emit('input', this.model)
            },
            timeModel(newVal) {
                moment.locale(this.momentLocale);
                let spl = newVal.split(":");

                let modelMoment = moment(this.model);
                if(spl[0] !== 'NaN') {
                    modelMoment.hour(parseInt(spl[0]));
                }
                if(spl[1] !== 'NaN') {
                    modelMoment.minute(parseInt(spl[1]));
                }
                this.model = modelMoment.toJSON();
                this.$emit('input', this.model)
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
            menu : {
                get() {
                    return this.menuOpen;
                },
                set(newVal) {
                    this.menuOpen = newVal;

                    if(this.menuOpen) {
                        moment.locale(this.momentLocale);
                        let modelMoment = moment(this.model.substring(0));

                        let dateMoment = moment();
                        dateMoment.year(modelMoment.year());
                        dateMoment.month(modelMoment.month());
                        dateMoment.day(modelMoment.day());
                        this.dateModel = dateMoment.toJSON();

                        this.timeModel = modelMoment.format('HH:mm');
                    }
                }
            },
            dateFormatted() {
                console.log("dateFormatted", this.model);
                moment.locale(this.momentLocale);
                let date = moment(this.model);
                return date.format(Locale[this.locale].datetimeFormat);
            },
            momentLocale() {
                return this.locale ? this.locale.substring(0,2) : 'en';
            },
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
