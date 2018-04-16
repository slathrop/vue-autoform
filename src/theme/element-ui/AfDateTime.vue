<template>
    <div>
        <label>{{label}}</label>
        <el-date-picker
                clearable
                @change="onInput"
                v-model="modelDate"
                type="datetime"
                :format="dateFormat"
                :picker-options="pickerOptions">
        </el-date-picker>
    </div>

</template>

<script>
    import Locale from '../../locales'



    export default {
        data() {
            return {
                model : this.value
            }
        },
        watch : {
            value(newVal, oldVal) {
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
            modelDate : {
                get() {
                    return new Date(this.model);
                },
                set(newVal) {
                    this.model = newVal.toJSON();
                    this.$emit('input', this.model)
                }
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
            },
            dateFormat() {
                return Locale[this.locale].elementUiDatetimeFormat || 'yyyy/MM/dd HH:mm'
            },
            pickerOptions() {
                return {
                    disabledDate : (time) => {
                        if(this.schema.min) {
                            const min = new Date(this.schema.min);
                            return time.getTime() < min.getTime();
                        }
                        if(this.schema.max) {
                            const max = new Date(this.schema.max);
                            return time.getTime() > max.getTime();
                        }
                        return false;
                    }
                }
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
