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
	<div>
		<label v-if="label" :for="id">{{ label }}</label>
		<select
			:id="id"
			:disabled="disabled"
			@change="onSelect">
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
				v-bind="{ selected: option.value === value }">
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<script>
import { randomId } from '../../utils/randomId'

export default {
	name: 'DurationSelect',
	props: {
		label: {
			type: String,
			default: '',
		},
		value: {
			type: Number,
			default: 5,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			id: randomId(),
			options: [
				{ value: 5, label: this.t('calendar', '5 minutes') },
				{ value: 10, label: this.t('calendar', '10 minutes') },
				{ value: 15, label: this.t('calendar', '15 minutes') },
				{ value: 30, label: this.t('calendar', '30 minutes') },
				{ value: 45, label: this.t('calendar', '45 minutes') },
				{ value: 60, label: this.t('calendar', '1 hour') },
			],
		}
	},
	computed: {
	},
	methods: {
		onSelect(e) {
			this.$emit('update:value', parseInt(e.target.value))
		},
	},
}
</script>

<style lang="scss" scoped>
select {
	width: 100%;
}
</style>
