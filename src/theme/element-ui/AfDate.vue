<template>
    <div>
        <label>{{label}}</label>
        <el-date-picker
                @change="onInput"
                v-model="model"
                type="date"
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
                return Locale[this.locale].dateFormat || 'yyyy/MM/dd'
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
