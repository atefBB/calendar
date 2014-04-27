<?php
/**
 * Copyright (c) 2014 Georg Ehrke <oc.list@georgehrke.com>
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 * See the COPYING-README file.
 */
namespace OCA\Calendar\Http;

use \OCP\AppFramework\IAppContainer;

class Reader extends Manager {

	const Calendar = 107;
	const Object = 108;
	const Timezone = 109;


	/**
	 * reader object
	 * @var \OCA\Calendar\Http\IReader
	 */
	private $reader;


	/**
	 * @brief Constructor
	 * @param IAppContainer $app
	 * @param integer $type
	 * @param resource $handle
	 * @param string $requestedMimeType
	 */
	public function __construct(IAppContainer $app, $type, $handle, $requestedMimeType) {
		$class = self::get($type, $requestedMimeType);
		if (!$class) {
			throw new \Exception('No reader found.');
		}

		$this->reader = new $class($app, $handle);
	}


	public function __call($method, $params) {
		if(is_callable(array($this->reader, $method))) {
			return call_user_func_array(array($this->reader, $method), $params);
		}
		throw new \BadFunctionCallException('Call to undefined method ' . $method);
	}
}

Reader::set(Reader::Calendar, 'OCA\\Calendar\\Http\\JSON\\JSONCalendarReader', 'application/json');
Reader::set(Reader::Calendar, 'OCA\\Calendar\\Http\\JSON\\JSONCalendarReader', 'application/calendar+json');
Reader::set(Reader::Object, 'OCA\\Calendar\\Http\\JSON\\JSONObjectReader', 'application/json');
Reader::set(Reader::Object, 'OCA\\Calendar\\Http\\JSON\\JSONObjectReader', 'application/calendar+json');

Reader::set(Reader::Object, 'OCA\\Calendar\\Http\\ICS\\ICSObjectReader', 'text/calendar');