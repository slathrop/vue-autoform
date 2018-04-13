<template>
    <v-app id="app" light>
        <v-toolbar app fixed color="primary" dark>
            <v-toolbar-title>Auto Form Examples</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat dark href="https://github.com/norx85/vue-auto-form" target="_blank">
                Documentation
            </v-btn>
        </v-toolbar>
        <v-content class="darken-1--after">
            <v-container>
                <v-card>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs12 md4>
                                    <v-select :items="themes" v-model="theme" label="Current theme" ></v-select>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-select :items="locales" v-model="locale" label="Current locale" @input="onChangeLocale"></v-select>
                                </v-flex>
                                <v-flex xs12 md4>
                                    <v-select :items="examples" v-model="example" label="Schema example" item-text="title" item-value="title" return-object @input="onChangeExample"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-container>
            <v-container grid-list-md>
                <v-layout row wrap>
                    <v-flex xs12 lg6>
                        <v-card>
                            <v-card-title class="title">{{example.title}}</v-card-title>
                            <v-card-text>
                                <af-form ref="autoForm" :schema="schema" v-model="form" :locale="locale" :theme="theme" @submit="onSubmit"></af-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="onSubmit">Submit</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 lg6>
                        <v-card>
                            <v-card-title class="title">Schema</v-card-title>
                            <v-card-text>
                                <highlight language="json">{{ code }}</highlight>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>

            </v-container>
        </v-content>

    </v-app>

</template>
<script>
    import AfForm from '../src'
    import examples from './examples'
    import Highlight from 'vue-highlight-component'
    import 'highlight.js/styles/railscasts.css'
    import elementUiLocale from 'element-ui/lib/locale'
    import en from 'element-ui/lib/locale/lang/en'
    import it from 'element-ui/lib/locale/lang/it'
    import cn from 'element-ui/lib/locale/lang/zh-CN'
    elementUiLocale.use(en)
    export default {
        name: 'app',
        components : { AfForm, Highlight },
        data () {
            return {
                theme : "vuetify",
                themes : [
                    { text : "Vuetify", value : "vuetify" },
                    { text : "Element UI", value : "element-ui" }
                ],
                form : {},
                schema : {},
                example: examples[0],
                examples: examples,
                locales : [
                    { text : "English" , value : "en_us", elUiLocale : en },
                    { text : "Italian" , value : "it_it", elUiLocale : it },
                    { text : "Chinese" , value : "zh_cn", elUiLocale : cn }
                ],
                locale: 'en_us'
            }
        },
        computed : {
            code() {
                let schema = this.example.schema;
                return JSON.stringify(schema, null, 2)
            },
            localeData() {
                for(let i = 0; i < this.locales.length; i++) {
                    if(this.locales[i].value === this.locale) {
                        return this.locales[i].elUiLocale;
                    }
                }
                return en;
            }
        },
        methods: {
            onChangeLocale (e) {
                elementUiLocale.use(this.localeData)
            },
            onChangeExample (e) {
                console.log("resetting data");
                this.form = {};
                this.schema = this.example.schema
            },
            onSubmit () {
                window.alert('Submit data: ' + JSON.stringify(this.form))
            }
        },
        beforeMount(){
            this.schema = this.example.schema
        },
        mounted() {
        }
    }
</script>

