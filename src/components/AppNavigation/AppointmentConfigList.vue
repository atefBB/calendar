<!--
  - @copyright Copyright (c) 2021 Richard Steinmetz <richard@steinmetz.cloud>
  -
  - @author Richard Steinmetz <richard@steinmetz.cloud>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<div class="appointment-config-list">
		<AppNavigationCaption
			class="appointment-config-list__caption"
			:title="t('calendar', 'Appointment')">
			<template #actions>
				<ActionButton @click="showModalForNewConfig = true">
					<PlusIcon slot="icon" :size="20" decorative />
					{{ t('calendar', 'Add new') }}
				</ActionButton>
			</template>
		</AppNavigationCaption>
		<AppointmentConfigListItem
			v-for="config in configs"
			:key="config.id"
			:config="config" />

		<AppointmentConfigModal
			v-if="showModalForNewConfig"
			:is-new="true"
			:config="defaultConfig"
			@save="saveNewConfig"
			@close="closeModal" />
	</div>
</template>

<script>
import AppointmentConfigListItem from './AppointmentConfigList/AppointmentConfigListItem'
import AppNavigationCaption from '@nextcloud/vue/dist/Components/AppNavigationCaption'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import PlusIcon from 'vue-material-design-icons/Plus'
import AppointmentConfigModal from '../AppointmentConfigModal'
import AppointmentConfig, { generateAppointmentConfigs } from '../../models/appointmentConfig'
import logger from '../../utils/logger'
import { mapState } from 'vuex'

export default {
	name: 'AppointmentConfigList',
	components: {
		AppointmentConfigListItem,
		AppNavigationCaption,
		ActionButton,
		PlusIcon,
		AppointmentConfigModal,
	},
	data() {
		return {
			loading: false,
			showModalForNewConfig: false,
		}
	},
	computed: {
		...mapState({
			configs: state => Object.values(state.appointmentConfigs.configs),
		}),
		defaultConfig() {
			return new AppointmentConfig()
		},
	},
	async created() {
		for (const config of generateAppointmentConfigs()) {
			await this.$store.dispatch('addConfig', { config })
		}
	},
	methods: {
		closeModal() {
			this.showModalForNewConfig = false
		},
		async saveNewConfig(config) {
			logger.info('Saving new config', { config })

			this.loading = true
			try {
				await this.$store.dispatch('addConfig', { config })
				this.closeModal()
			} catch (error) {
				logger.error('Creating appointment config failed', { error, config })
			} finally {
				this.loading = false
			}
		},
	},
}
</script>

<style lang="scss" scoped>
</style>
