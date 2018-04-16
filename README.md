# vue-autoform
A [Vue.js](https://vuejs.org/) library to automate form creation, with theming support.

Supported Vue.js version: >= 2.5

Supported ui themes (for now) are:
* [Vuetify](https://vuetifyjs.com/en/) version >= 1
* [Element-UI](http://element.eleme.io/#/en-US) version >= 2

## To install
```
npm i --save @norx85/vue-autoform
```
If you have problem importing this module with webpack it's probably caused by the '@' char of my scoped package, because Webpack try to resolve src folder.
A workaround is to override '@' behavior in webpack `resolve.alias` config:
```js
module.exports = {
    resolve: {
        alias: {
            // put this to solve scoped package resolution in node_modules
            '@': resolve('src')
        }
    }
    ...
}
```
## How it works
app.js
```js
import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import AutoForm from '@norx85/vue-autoform';
Vue.use(Vuetify);
Vue.use(AutoForm);
new Vue({
    el: '#app',
    components: { App },
    template: '<app/>'
});

```
App.vue
```vue
<template>
    <h2>Register</h2>
    <af-form v-model="formData" :schema="schema" locale="en_us" theme="vuetify" @submit="onSubmit"></auto-form>
</template>
<script>
    export default {
        name: 'app',
        data () {
            return {
                formData : {},
                schema : [
                    {
                        label : 'Name',
                        name : 'name',
                        type: 'string'
                    },
                    {
                        label : 'Surname',
                        name : 'surname',
                        type: 'string'
                    },
                    {
                        label : 'Email',
                        name : 'email',
                        type: 'string',
                        inputType: 'email'
                    },
                    {
                        label : 'Password',
                        name : 'password',
                        type: 'string',
                        inputType: 'password'
                    },
                    {
                        label : 'Confirm Password',
                        name : 'confirm_password',
                        type: 'string',
                        inputType: 'password'
                    }
                ]
            }
        },
        methods: {
            onSubmit () {
                // do what you want with submitted data
                console.log(this.formData)
            }
        },
        beforeMount(){
            this.formData = {
                name : 'Nicolas',
                surname : 'Cage'
            };
        }
    }
</script>
```

## Docs
### `<af-form />`
##### properties
Property | Type | Possible values | Default | Description
--- | --- | --- | --- | ---
**theme** | *String* | vuetify, element-ui | vuetify | The theme used by the form
**locale** | *String* | en_us, it_it, zh_cn | en_us | The locale used by the form
**schema** | *[Schema]* | - | - | An array of Schema objects the defines the form fields
**value** | *Object* | - | - | bindable value of the form, use `v-model` to obtains a two-way binding to value

##### events
Event | Description
--- | ---
**input** | fired when form data change
**submit** | fired on submit

### `Schema`
##### properties
Property | Type | Possible values | Default | Description
--- | --- | --- | --- | ---
**name** | *String* | - | - | Name of the field in submitted data
**type** | *String* | string, number, boolean, date, datetime, time, object | - | Data type of the field
**inputType** | *String* | html types in text field, other values are: radio, select, checkbox | - | Determines the type of input rendered
**multiple** | *Boolean* | `true`, `false` | `false` | If `true` the field contains an array of the selected data type (if possible)
**defaultValue** | *Any* | - | - | A default value for the field, must be in the corresponding data type
**min** | *Number* | - | 0 | In a text field is the min char count, in a number field the min value, in a multiple select or checkbox the min number of values to be choosed, in a date field is the min choosable date
**max** | *Number* | - | - | In a text field is the max char count, in a number field the max value, in a multiple select or checkbox the max number of values that can be choosed, in a date field is the max choosable date
**step** | *Number* | > 0 | 1 | The step of a numeric field
**rows** | *Number* | >= 1 | 1 | In a text field determines if is a text area and the number of rows
**regEx** | *RegEx* | - | - | Used to validate a text field
**prefix** | *String* | - | - | Add a prefix text where possible
**suffix** | *String* | - | - | Add a prefix text where possible
**options** | [*String*], [*Number*], [*Object*] | - | - | Array of options for a multiple type field
**textProp** | *String* | - | - | When options are objects defines the property to be used as label
**valueProp** | *String* | - | - | When options are objects defines the property to be used as value
**trueLabel** | *String* | - | based on locale | In a boolean field is the label used for the `true` option
**falseLabel** | *String* | - | based on locale | In a boolean field is the label used for the `false` option
**$** | *[Schema]* | - | - | This property is array of `Schema`, required and used only when type is `object`. It defines the form fields of the represented object


## Code Example
[source](https://github.com/norx85/vue-autoform/tree/master/example)

## Roadmap to v1
* GeoJSON fields
* Working form validation
* Passing custom class to fields
* Passing custom properties to fields
* Custom theming
* Custom locales
* More locales

## Credits
This library is inspired by [`wenzhixin vue-auto-form`](https://github.com/wenzhixin/vue-auto-form)

## License
This library is licensed under the [The MIT License](https://github.com/norx85/vue-autoform/blob/master/LICENSE).

If you like my work you can **Star** this repository or you can buy me a coffe:

**My Bitcoin address**

`1PSFzd1oZX4q6EK1rKV8qyVZMTGujdAUic`

<img src="btc.png" alt="btc-support"/>

**My Ethereum address**

`0x22A1fce43f874EBa36fC5984C189Be04866BBA91`

<img src="eth.png" alt="eth-support"/>

Thanks for your support

Giulio De Giorgio <norx85gh@gmail.com>