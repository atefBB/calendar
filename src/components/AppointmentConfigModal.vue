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
	<Modal
		size="large"
		@close="$emit('close')">
		<!-- Wait for the config to become available before rendering the form. -->
		<div v-if="editing" class="appointment-config-modal">
			<h2>{{ title }}</h2>

			<div class="appointment-config-modal__form">
				<fieldset>
					<TextInput
						class="appointment-config-modal__form__row"
						label="Name"
						:value.sync="editing.name" />
					<TextInput
						class="appointment-config-modal__form__row"
						label="Location"
						:value.sync="editing.location" />
					<TextArea
						class="appointment-config-modal__form__row"
						label="Description"
						:value.sync="editing.description" />

					<div class="appointment-config-modal__form__row appointment-config-modal__form__row--wrapped">
						<div class="calendar-select">
							<label>{{ t('calendar', 'Calendar') }}</label>
							<CalendarPicker
								:calendar="calendar"
								:calendars="sortedCalendars"
								:show-calendar-on-select="false"
								@select-calendar="changeCalendar" />
						</div>

						<div class="availability-select">
							<label>{{ availabilityModel.readableName }}</label>
							<Multiselect
								:options="availabilityModel.options"
								:searchable="false"
								:title="availabilityModel.readableName"
								:value="availability"
								track-by="value"
								label="label"
								@select="changeAvailability" />
						</div>
					</div>

					<div class="appointment-config-modal__form__row appointment-config-modal__form__row--wrapped">
						<DurationInput
							label="Duration"
							:value.sync="editing.length" />
						<DurationSelect
							label="Increments"
							:value.sync="editing.increment" />
					</div>
				</fieldset>

				<fieldset>
					<header>Add time before and after the event</header>

					<div class="appointment-config-modal__form__row appointment-config-modal__form__row--wrapped">
						<CheckedDurationSelect
							label="Before the event"
							:enabled.sync="enablePreparationDuration"
							:value.sync="editing.preparationDuration" />
						<CheckedDurationSelect
							label="After the event"
							:enabled.sync="enableFollowupDuration"
							:value.sync="editing.followupDuration" />
					</div>
				</fieldset>

				<fieldset>
					<header>Planning restrictions</header>

					<div class="appointment-config-modal__form__row appointment-config-modal__form__row--wrapped">
						<DurationSelect
							label="Minimum time before next available slot"
							:value.sync="editing.buffer" />
						<NumberInput
							label="Max slots per day"
							:value.sync="editing.dailyMax" />
					</div>
				</fieldset>
			</div>
			<button
				class="primary appointment-config-modal__submit-button"
				:disabled="!editing.name"
				@click="save">
				{{ saveButtonText }}
			</button>
		</div>
	</Modal>
</template>

<script>
import Modal from '@nextcloud/vue/dist/Components/Modal'
import TextInput from './AppointmentConfigModal/TextInput'
import TextArea from './AppointmentConfigModal/TextArea'
import AppointmentConfig from '../models/appointmentConfig'
import Multiselect from '@nextcloud/vue/dist/Components/Multiselect'
import { getRFCProperties } from '../models/rfcProps'
import { mapGetters, mapState } from 'vuex'
import CalendarPicker from './Shared/CalendarPicker'
import DurationInput from './AppointmentConfigModal/DurationInput'
import NumberInput from './AppointmentConfigModal/NumberInput'
import DurationSelect from './AppointmentConfigModal/DurationSelect'
import CheckedDurationSelect from './AppointmentConfigModal/CheckedDurationSelect'
import { randomId } from '../utils/randomId'

export default {
	name: 'AppointmentConfigModal',
	components: {
		CheckedDurationSelect,
		CalendarPicker,
		DurationInput,
		Modal,
		Multiselect,
		NumberInput,
		TextInput,
		TextArea,
		DurationSelect,
	},
	props: {
		config: {
			type: AppointmentConfig,
			required: true,
		},
		isNew: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			editing: undefined,
			enablePreparationDuration: false,
			enableFollowupDuration: false,
		}
	},
	computed: {
		...mapState({
			calendars: state => state.calendars.calendars,
		}),
		...mapGetters([
			'sortedCalendars',
		]),
		title() {
			if (this.isNew) {
				return this.$t('calendar', 'Create appointment')
			}

			return this.$t('calendar', 'Edit appointment')
		},
		saveButtonText() {
			if (this.isNew) {
				return this.$t('calendar', 'Save')
			}

			return this.$t('calendar', 'Update')
		},
		availabilityModel() {
			return getRFCProperties().timeTransparency
		},
		availability() {
			const availability = this.editing.availability ?? this.availabilityModel.defaultValue
			return this.availabilityModel.options.find(opt => opt.value === availability)
		},
		calendar() {
			if (!this.editing.targetCalendarUri) {
				return this.sortedCalendars[0]
			}

			const url = this.editing.targetCalendarUri
			return this.sortedCalendars.find(cal => cal.url === url)
		},
	},
	watch: {
		config() {
			this.cloneConfig()
		},
	},
	created() {
		this.cloneConfig()
	},
	methods: {
		cloneConfig() {
			this.editing = this.config?.clone() ?? new AppointmentConfig()
			this.editing.id ??= randomId()
		},
		changeAvailability(value) {
			this.editing.availability = value.value
		},
		changeCalendar(calendar) {
			this.editing.targetCalendarUri = calendar.url
		},
		save() {
			if (!this.enablePreparationDuration) {
				this.editing.preparationDuration = undefined
			}

			if (!this.enableFollowupDuration) {
				this.editing.followupDuration = undefined
			}

			this.$emit('save', this.editing)
		},
	},
}
</script>

<style lang="scss" scoped>
// TODO: move to global scss file
.appointment-config-modal {
	overflow: auto;
	padding: 2vw;
	max-width: 900px;

	// Subtract padding twice from max height (taken from Modal component)
	max-height: calc(90vh - 4vw);

	&__form {
		display: flex;
		flex-direction: column;
		width: 100%;

		fieldset {
			padding: 20px 0;

			header {
				font-size: 16px;
				margin-bottom: 3px;
			}
		}

		.availability-select, .calendar-select {
			display: flex;
			flex-direction: column;
		}

		&__row {
			&--wrapped {
				display: flex;
				flex-wrap: wrap;
				gap: 10px 50px;

				> div {
					flex: 1 200px;
				}
			}
		}

		&__row + &__row {
			margin-top: 10px;
		}

		// Fix calendar picker styling
		::v-deep .multiselect__tags {
			height: unset;
			margin: 0;
		}
	}

	&__submit-button {
		margin-top: 20px;
	}
}
</style>
