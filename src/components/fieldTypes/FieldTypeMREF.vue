<template>
  <div>
    <span v-if="showPropertyName && !label.includes(':')">{{ label }}:</span>
    <span v-if="showPropertyName && label.includes(':')">{{ label }}</span>
    <span v-if="attribute.includes('N/A')">
      N/A
    </span>
    <span v-else>
      {{ attribute }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'FieldTypeMREF',
  props: ['property', 'information', 'showPropertyName'],
  data () {
    return {
      label: this.property.label,
      name: this.property.name,
      attribute: 'N/A',
      isClickable: false
    }
  },
  /*
  Checks if given field is available in the information, if not then set to 'N/A'
   */
  created () {
    this.setAttribute()
  },
  watch: {
    information () {
      this.setAttribute()
    }
  },
  methods: {
    setAttribute () {
      let name = this.name
      let attribute = ''
      let nestedInformation = this.information[this.name][0]
      if (typeof nestedInformation !== 'undefined') {
        Object.keys(nestedInformation).forEach((key) => {
          if (key.includes(name)) {
            attribute = nestedInformation[key]
          }
        })
        this.attribute = attribute
      }
    }
  }
}
</script>
