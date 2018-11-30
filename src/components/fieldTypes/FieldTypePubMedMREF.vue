<template>
  <div>
    <span v-if="showPropertyName">{{ label }}:</span>
    <span v-if="attribute !== 'N/A' && extraPublicationInformation[attribute]">
      <router-link :to="{name: 'PubMed', params: {id: attribute}}">{{ attribute }}</router-link>
      <a :href="extraPublicationInformation[attribute]['ExternalLink']" target="_blank">
        <font-awesome-icon icon="external-link-alt" class="fa-icon icon"></font-awesome-icon>
      </a>
    </span>
    <span v-else>
      {{ attribute }}
    </span>
  </div>
</template>

<script>
import { GET_EXTRA_PUBLICATION_INFORMATION } from '../../store/modules/patients/actions'
import { mapGetters } from 'vuex'

export default {
  name: 'FieldTypePubMedMREF',
  props: ['information', 'property', 'entity', 'showPropertyName'],
  data () {
    return {
      label: this.property.label,
      name: this.property.name,
      attribute: 'N/A'
    }
  },
  computed: {
    ...mapGetters({
      extraPublicationInformation: 'patients/getExtraPublicationInformation'
    })
  },
  created () {
    this.getAttribute()
    this.getExternalURL()
  },
  watch: {
    information () {
      this.getAttribute()
      this.getExternalURL()
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
    },
    getExternalURL () {
      if (!this.extraPublicationInformation.hasOwnProperty(this.attribute) && this.attribute !== 'N/A') {
        this.$store.dispatch('patients/' + GET_EXTRA_PUBLICATION_INFORMATION, this.information[this.name][0]['_href'])
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
