<template>
    <div>
        <label>{{label}}</label>
        <el-checkbox-group v-model="model" :min="this.schema.min" :max="this.schema.max" @change="onInput">
            <el-checkbox
                    v-for="(opt, index) in items"
                    :key="index"
                    :label="opt.value">{{opt.text}}</el-checkbox>
        </el-checkbox-group>

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
        watch : {
            value() {
                this.model = this.value;
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
            },
            min() {
                return this.schema.min || undefined
            },
            max() {
                return this.schema.max || undefined
            },
            rules() {
                let messages = Locale[this.locale];
                let items = [];

                if(this.schema.type === 'array'){
                    if(this.schema.max) {
                        items.push( (v) => v.length <= this.schema.max || Locale.format(messages.maxCount, this.label, this.schema.max) )
                    }
                    if(this.schema.min) {
                        items.push( (v) => v.length >= this.schema.min || Locale.format(messages.minCount, this.label, this.schema.min) )
                    }
                }

                return items
            }
        },
        methods: {
            onInput (val) {
                this.$emit('input', this.model)
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
