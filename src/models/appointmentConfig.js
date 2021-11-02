/**
 * @copyright Copyright (c) 2021 Richard Steinmetz <richard@steinmetz.cloud>
 *
 * @author Richard Steinmetz <richard@steinmetz.cloud>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

/** @class */
export default class AppointmentConfig {

	/** @member {number} */
	id

	/** @member {string} */
	name

	/** @member {string} */
	description

	/** @member {string} */
	location

	/** @member {string} */
	visibility

	/** @member {string} */
	targetCalendarUri

	/** @member {string} */
	availability

	/** @member {number} */
	length

	/** @member {number} */
	increment

	/** @member {number} */
	preparationDuration

	/** @member {number} */
	followupDuration

	/** @member {number} */
	buffer

	/** @member {?number} */
	dailyMax

	/** @member {?string} */
	freebusyUris

	constructor(data) {
		const {
			id,
			name,
			description,
			location,
			visibility,
			targetCalendarUri,
			availability,
			length,
			increment,
			preparationDuration,
			followupDuration,
			buffer,
			dailyMax,
			freebusyUris,
		} = data ?? {}

		this.id = id
		this.name = name
		this.description = description
		this.location = location
		this.visibility = visibility
		this.targetCalendarUri = targetCalendarUri
		this.availability = availability
		this.length = length
		this.increment = increment
		this.preparationDuration = preparationDuration
		this.followupDuration = followupDuration
		this.buffer = buffer
		this.dailyMax = dailyMax
		this.freebusyUris = freebusyUris
	}

	clone() {
		const data = {
			id: this.id,
			name: this.name,
			description: this.description,
			location: this.location,
			visibility: this.visibility,
			targetCalendarUri: this.targetCalendarUri,
			availability: this.availability,
			length: this.length,
			increment: this.increment,
			preparationDuration: this.preparationDuration,
			followupDuration: this.followupDuration,
			buffer: this.buffer,
			dailyMax: this.dailyMax,
			freebusyUris: this.freebusyUris,
		}
		return new AppointmentConfig(JSON.parse(JSON.stringify(data)))
	}

}

// FIXME: just for testing -> remove once API is merged
/**
 * @return {AppointmentConfig[]}
 */
export function generateAppointmentConfigs() {
	return [
		new AppointmentConfig({
			id: Math.random().toString(16).slice(2),
			name: 'Meeting',
			location: 'Office',
		}),
	]
}
