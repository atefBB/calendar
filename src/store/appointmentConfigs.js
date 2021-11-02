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

import Vue from 'vue'

const state = {
	configs: {},
}

const mutations = {
	updateConfig(state, { config }) {
		Vue.set(state.configs, config.id, config.clone())
	},
	addConfig(state, { config }) {
		Vue.set(state.configs, config.id, config.clone())
	},
	deleteConfig(state, { id }) {
		Vue.delete(state.configs, id)
	},
}

const getters = {
}

const actions = {
	async updateConfig({ commit }, { config }) {
		// await updateConfig()
		commit('updateConfig', { config })
	},
	async addConfig({ commit }, { config }) {
		// await createConfig()
		commit('addConfig', { config })
	},
	async deleteConfig({ commit }, { id }) {
		// await deleteConfig()
		commit('deleteConfig', { id })
	},
}

export default { state, mutations, getters, actions }
