<template>
    <div>
        <label class="subheading">{{label}}</label>
        <v-radio-group v-model="model" @change="onInput">
            <v-radio v-for="(item, index) in items" :key="index" :label="item.text" :value="item.value" color="primary" ></v-radio>
        </v-radio-group>
    </div>
</template>

<script>
    import _ from 'lodash';
    import moment from 'moment';
    import Locale from '../../locales'
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
            value : {},
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
            momentLocale() {
                return this.locale ? this.locale.substring(0,2) : 'en';
            },
            label() {
                return this.schema.label || this.schema.name;
            },
            trueLabel() {
                return this.schema.trueLabel || Locale[this.locale].yes;
            },
            falseLabel() {
                return this.schema.falseLabel || Locale[this.locale].no;
            },
            items() {
                if(this.schema.type === 'boolean') {
                    return [
                        { text : this.trueLabel, value : true },
                        { text : this.falseLabel, value : false },
                    ]
                }

                return this.schema.options.map((item)=>{

                    if(_.isObject(item)) {
                        let text = item[this.itemText];
                        if(this.schema.type === 'date' && _.isDate(text)) {
                            moment.locale(this.momentLocale);
                            text = moment(text).format("ll");
                        }
                        if(this.schema.type === 'datetime' && _.isDate(text)) {
                            moment.locale(this.momentLocale);
                            text = moment(text).format("lll");
                        }
                        return {
                            text : text,
                            value : item[this.itemValue]
                        }
                    }

                    if(this.schema.type === 'datetime' || _.isDate(item)) {
                        moment.locale(this.momentLocale);
                        let text = moment(item).format("lll");
                        return {
                            text : text,
                            value : item
                        }
                    }
                    if(this.schema.type === 'date') {
                        moment.locale(this.momentLocale);
                        let text = moment(item).format("ll");
                        return {
                            text : text,
                            value : item
                        }
                    }

                    if(this.schema.type === 'number' && _.isNumber(item)) {
                        return {
                            text : item.toString(),
                            value : item
                        }
                    }

                    return {
                        text : item,
                        value : item
                    }
                });
            },
            itemText() {
                return this.schema.textProp || 'text'
            },
            itemValue() {
                return this.schema.valueProp || 'value'
            }
        },
        methods: {
            onInput (val) {
                this.$emit('input', val)
            }
        },
        mounted() {
            if(!this.value && this.schema.defaultValue) {
                this.$emit('input', this.model);
                this.model = this.schema.defaultValue
            }
        }
    }
</script>
