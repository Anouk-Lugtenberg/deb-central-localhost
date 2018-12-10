<template>
  <div>
    <span v-if="showPropertyName">{{ label }}:</span>
    <span v-if="attribute !== 'N/A' && allReferences[attribute]">
      <router-link :to="{name: 'PubMed', params: {id: attribute}}">{{ attribute }}</router-link>
      <span v-if="allReferences[attribute]['ExternalLink']">
        <a :href="allReferences[attribute]['ExternalLink']" target="_blank">
          <font-awesome-icon icon="external-link-alt" class="fa-icon icon"></font-awesome-icon>
        </a>
      </span>
    </span>
    <span v-else>
      {{ attribute }}
    </span>
  </div>
</template>

<script>
import { GET_ALL_REFERENCES } from '../../store/actions'
import { mapGetters } from 'vuex'

export default {
  name: 'FieldTypePubMedMREF',
  props: ['information', 'property', 'showPropertyName'],
  data () {
    return {
      label: this.property.label,
      name: this.property.name,
      attribute: 'N/A'
    }
  },
  computed: {
    ...mapGetters({
      allReferences: 'getAllReferences'
    })
  },
  created () {
    this.getAttribute()
    if (Object.keys(this.allReferences).length === 0) {
      this.$store.dispatch(GET_ALL_REFERENCES)
    }
  },
  watch: {
    information () {
      this.getAttribute()
    }
  },
  methods: {
    getAttribute () {
      let name = 'Pubmed'
      let attribute = 'N/A'
      let nestedInformation = this.information[this.name][0]
      if (typeof nestedInformation !== 'undefined') {
        Object.keys(nestedInformation).forEach((key) => {
          if (key.includes(name)) {
            if (nestedInformation[key].length > 0) {
              attribute = nestedInformation[key]
            }
          }
        })
        this.attribute = attribute
      }
    }
  }
}
</script>

<style scoped>
  .icon {
    font-size: 15px;
    display: inline-block;
    color: #3198bc;
  }
  .icon:hover {
    font-size: 18px;
    color: #1380b5;
    cursor: pointer;
  }
</style>
