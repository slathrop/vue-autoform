<template>
    <div>
        <label>{{label}}</label>
        <el-input
            :type="inputType"
            :rows="rows"
            :minlength="schema.min"
            :maxlength="schema.max"
            v-model="model"
            @change="onInput">
        <template v-if="schema.prefix" slot="prepend">
            <span>{{schema.prefix}}</span>
        </template>
        <template v-if="schema.suffix" slot="append">
            <span>{{schema.suffix}}</span>
        </template>
    </el-input>
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
            multiline(){
                return this.rows > 1;
            },
            rows() {
                return this.schema.rows || 1;
            },
            inputType() {
                return this.multiline ? "textarea" : "text";
            }
        },
        methods: {
            onInput (e) {
                this.$emit('input', this.model)
            }
        },
        mounted() {
            if(!this.value && this.schema.defaultValue) {
                this.model = this.schema.defaultValue
            }
        }
    }
</script>
