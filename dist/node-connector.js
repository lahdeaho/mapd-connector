module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(52);
	__webpack_require__(53);
	module.exports = __webpack_require__(54);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	exports.Thrift = __webpack_require__(2);

	var connection = __webpack_require__(4);
	exports.Connection = connection.Connection;
	exports.createClient = connection.createClient;
	exports.createConnection = connection.createConnection;
	exports.createSSLConnection = connection.createSSLConnection;
	exports.createStdIOClient = connection.createStdIOClient;
	exports.createStdIOConnection = connection.createStdIOConnection;

	var httpConnection = __webpack_require__(16);
	exports.HttpConnection = httpConnection.HttpConnection;
	exports.createHttpConnection = httpConnection.createHttpConnection;
	exports.createHttpClient = httpConnection.createHttpClient;

	var wsConnection = __webpack_require__(19);
	exports.WSConnection = wsConnection.WSConnection;
	exports.createWSConnection = wsConnection.createWSConnection;
	exports.createWSClient = wsConnection.createWSClient;

	var xhrConnection = __webpack_require__(45);
	exports.XHRConnection = xhrConnection.XHRConnection;
	exports.createXHRConnection = xhrConnection.createXHRConnection;
	exports.createXHRClient = xhrConnection.createXHRClient;

	var server = __webpack_require__(46);
	exports.createServer = server.createServer;
	exports.createMultiplexServer = server.createMultiplexServer;

	var web_server = __webpack_require__(47);
	exports.createWebServer = web_server.createWebServer;

	exports.Int64 = __webpack_require__(13);
	exports.Q = __webpack_require__(50);

	var mprocessor = __webpack_require__(49);
	var mprotocol = __webpack_require__(51);
	exports.Multiplexer = mprotocol.Multiplexer;
	exports.MultiplexedProcessor = mprocessor.MultiplexedProcessor;

	/*
	 * Export transport and protocol so they can be used outside of a
	 * cassandra/server context
	 */
	exports.TFramedTransport = __webpack_require__(39);
	exports.TBufferedTransport = __webpack_require__(8);
	exports.TBinaryProtocol = __webpack_require__(11);
	exports.TJSONProtocol = __webpack_require__(42);
	exports.TCompactProtocol = __webpack_require__(41);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var util = __webpack_require__(3);

	var Type = exports.Type = {
	  STOP: 0,
	  VOID: 1,
	  BOOL: 2,
	  BYTE: 3,
	  I08: 3,
	  DOUBLE: 4,
	  I16: 6,
	  I32: 8,
	  I64: 10,
	  STRING: 11,
	  UTF7: 11,
	  STRUCT: 12,
	  MAP: 13,
	  SET: 14,
	  LIST: 15,
	  UTF8: 16,
	  UTF16: 17
	};

	exports.MessageType = {
	  CALL: 1,
	  REPLY: 2,
	  EXCEPTION: 3,
	  ONEWAY: 4
	};

	exports.TException = TException;

	function TException(message) {
	  Error.call(this);
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.message = message;
	};
	util.inherits(TException, Error);

	var TApplicationExceptionType = exports.TApplicationExceptionType = {
	  UNKNOWN: 0,
	  UNKNOWN_METHOD: 1,
	  INVALID_MESSAGE_TYPE: 2,
	  WRONG_METHOD_NAME: 3,
	  BAD_SEQUENCE_ID: 4,
	  MISSING_RESULT: 5,
	  INTERNAL_ERROR: 6,
	  PROTOCOL_ERROR: 7,
	  INVALID_TRANSFORM: 8,
	  INVALID_PROTOCOL: 9,
	  UNSUPPORTED_CLIENT_TYPE: 10
	};

	exports.TApplicationException = TApplicationException;

	function TApplicationException(type, message) {
	  TException.call(this);
	  Error.captureStackTrace(this, this.constructor);
	  this.type = type || TApplicationExceptionType.UNKNOWN;
	  this.name = this.constructor.name;
	  this.message = message;
	};
	util.inherits(TApplicationException, TException);

	TApplicationException.prototype.read = function(input) {
	  var ftype;
	  var ret = input.readStructBegin('TApplicationException');

	  while(1){
	      ret = input.readFieldBegin();
	      if(ret.ftype == Type.STOP)
	          break;

	      switch(ret.fid){
	          case 1:
	              if( ret.ftype == Type.STRING ){
	                  ret = input.readString();
	                  this.message = ret;
	              } else {
	                  ret = input.skip(ret.ftype);
	              }
	              break;
	          case 2:
	              if( ret.ftype == Type.I32 ){
	                  ret = input.readI32();
	                  this.type = ret;
	              } else {
	                  ret   = input.skip(ret.ftype);
	              }
	              break;
	          default:
	              ret = input.skip(ret.ftype);
	              break;
	      }
	      input.readFieldEnd();
	  }
	  input.readStructEnd();
	};

	TApplicationException.prototype.write = function(output){
	  output.writeStructBegin('TApplicationException');

	  if (this.message) {
	      output.writeFieldBegin('message', Type.STRING, 1);
	      output.writeString(this.message);
	      output.writeFieldEnd();
	  }

	  if (this.code) {
	      output.writeFieldBegin('type', Type.I32, 2);
	      output.writeI32(this.code);
	      output.writeFieldEnd();
	  }

	  output.writeFieldStop();
	  output.writeStructEnd();
	};

	var TProtocolExceptionType = exports.TProtocolExceptionType = {
	  UNKNOWN: 0,
	  INVALID_DATA: 1,
	  NEGATIVE_SIZE: 2,
	  SIZE_LIMIT: 3,
	  BAD_VERSION: 4,
	  NOT_IMPLEMENTED: 5,
	  DEPTH_LIMIT: 6
	};


	exports.TProtocolException = TProtocolException;

	function TProtocolException(type, message) {
	  Error.call(this);
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.type = type;
	  this.message = message;
	};
	util.inherits(TProtocolException, Error);

	exports.objectLength = function(obj) {
	  return Object.keys(obj).length;
	};

	exports.inherits = function(constructor, superConstructor) {
	  util.inherits(constructor, superConstructor);
	};

	var copyList, copyMap;

	copyList = function(lst, types) {

	  if (!lst) {return lst; }

	  var type;

	  if (types.shift === undefined) {
	    type = types;
	  }
	  else {
	    type = types[0];
	  }
	  var Type = type;

	  var len = lst.length, result = [], i, val;
	  for (i = 0; i < len; i++) {
	    val = lst[i];
	    if (type === null) {
	      result.push(val);
	    }
	    else if (type === copyMap || type === copyList) {
	      result.push(type(val, types.slice(1)));
	    }
	    else {
	      result.push(new Type(val));
	    }
	  }
	  return result;
	};

	copyMap = function(obj, types){

	  if (!obj) {return obj; }

	  var type;

	  if (types.shift === undefined) {
	    type = types;
	  }
	  else {
	    type = types[0];
	  }
	  var Type = type;

	  var result = {}, val;
	  for(var prop in obj) {
	    if(obj.hasOwnProperty(prop)) {
	      val = obj[prop];
	      if (type === null) {
	        result[prop] = val;
	      }
	      else if (type === copyMap || type === copyList) {
	        result[prop] = type(val, types.slice(1));
	      }
	      else {
	        result[prop] = new Type(val);
	      }
	    }
	  }
	  return result;
	};

	module.exports.copyMap = copyMap;
	module.exports.copyList = copyList;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("util");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var util = __webpack_require__(3);
	var EventEmitter = __webpack_require__(5).EventEmitter;
	var net = __webpack_require__(6);
	var tls = __webpack_require__(7);
	var thrift = __webpack_require__(2);

	var TBufferedTransport = __webpack_require__(8);
	var TBinaryProtocol = __webpack_require__(11);
	var InputBufferUnderrunError = __webpack_require__(10);

	var createClient = __webpack_require__(14);

	var binary = __webpack_require__(9);

	var Connection = exports.Connection = function(stream, options) {
	  var self = this;
	  EventEmitter.call(this);

	  this.seqId2Service = {};
	  this.connection = stream;
	  this.ssl = (stream.encrypted);
	  this.options = options || {};
	  this.transport = this.options.transport || TBufferedTransport;
	  this.protocol = this.options.protocol || TBinaryProtocol;
	  this.offline_queue = [];
	  this.connected = false;
	  this.initialize_retry_vars();

	  this._debug = this.options.debug || false;
	  if (this.options.max_attempts &&
	      !isNaN(this.options.max_attempts) &&
	      this.options.max_attempts > 0) {
	     this.max_attempts = +this.options.max_attempts;
	  }
	  this.retry_max_delay = null;
	  if (this.options.retry_max_delay !== undefined &&
	      !isNaN(this.options.retry_max_delay) &&
	      this.options.retry_max_delay > 0) {
	     this.retry_max_delay = this.options.retry_max_delay;
	  }
	  this.connect_timeout = false;
	  if (this.options.connect_timeout &&
	      !isNaN(this.options.connect_timeout) &&
	      this.options.connect_timeout > 0) {
	     this.connect_timeout = +this.options.connect_timeout;
	  }

	  this.connection.addListener(this.ssl ? "secureConnect" : "connect", function() {
	    self.connected = true;

	    this.setTimeout(self.options.timeout || 0);
	    this.setNoDelay();
	    this.frameLeft = 0;
	    this.framePos = 0;
	    this.frame = null;
	    self.initialize_retry_vars();

	    self.offline_queue.forEach(function(data) {
	      self.connection.write(data);
	    });

	    self.emit("connect");
	  });

	  this.connection.addListener("error", function(err) {
	    // Only emit the error if no-one else is listening on the connection
	    // or if someone is listening on us, because Node turns unhandled
	    // 'error' events into exceptions.
	    if (self.connection.listeners('error').length === 1 ||
	        self.listeners('error').length > 0) {
	      self.emit("error", err);
	    }
	  });

	  // Add a close listener
	  this.connection.addListener("close", function() {
	    self.connection_gone(); // handle close event. try to reconnect
	  });

	  this.connection.addListener("timeout", function() {
	    self.emit("timeout");
	  });

	  this.connection.addListener("data", self.transport.receiver(function(transport_with_data) {
	    var message = new self.protocol(transport_with_data);
	    try {
	      while (true) {
	        var header = message.readMessageBegin();
	        var dummy_seqid = header.rseqid * -1;
	        var client = self.client;
	        //The Multiplexed Protocol stores a hash of seqid to service names
	        //  in seqId2Service. If the SeqId is found in the hash we need to
	        //  lookup the appropriate client for this call.
	        //  The connection.client object is a single client object when not
	        //  multiplexing, when using multiplexing it is a service name keyed
	        //  hash of client objects.
	        //NOTE: The 2 way interdependencies between protocols, transports,
	        //  connections and clients in the Node.js implementation are irregular
	        //  and make the implementation difficult to extend and maintain. We
	        //  should bring this stuff inline with typical thrift I/O stack
	        //  operation soon.
	        //  --ra
	        var service_name = self.seqId2Service[header.rseqid];
	        if (service_name) {
	          client = self.client[service_name];
	          delete self.seqId2Service[header.rseqid];
	        }
	        /*jshint -W083 */
	        client._reqs[dummy_seqid] = function(err, success){
	          transport_with_data.commitPosition();

	          var callback = client._reqs[header.rseqid];
	          delete client._reqs[header.rseqid];
	          if (callback) {
	            callback(err, success);
	          }
	        };
	        /*jshint +W083 */

	        if(client['recv_' + header.fname]) {
	          client['recv_' + header.fname](message, header.mtype, dummy_seqid);
	        } else {
	          delete client._reqs[dummy_seqid];
	          self.emit("error",
	                    new thrift.TApplicationException(thrift.TApplicationExceptionType.WRONG_METHOD_NAME,
	                             "Received a response to an unknown RPC function"));
	        }
	      }
	    }
	    catch (e) {
	      if (e instanceof InputBufferUnderrunError) {
	        transport_with_data.rollbackPosition();
	      }
	      else {
	        self.emit('error', e);
	      }
	    }
	  }));
	};
	util.inherits(Connection, EventEmitter);

	Connection.prototype.end = function() {
	  this.connection.end();
	};

	Connection.prototype.destroy = function() {
	  this.connection.destroy();
	};

	Connection.prototype.initialize_retry_vars = function () {
	  this.retry_timer = null;
	  this.retry_totaltime = 0;
	  this.retry_delay = 150;
	  this.retry_backoff = 1.7;
	  this.attempts = 0;
	};

	Connection.prototype.write = function(data) {
	  if (!this.connected) {
	    this.offline_queue.push(data);
	    return;
	  }
	  this.connection.write(data);
	};

	Connection.prototype.connection_gone = function () {
	  var self = this;
	  this.connected = false;

	  // If a retry is already in progress, just let that happen
	  if (this.retry_timer) {
	    return;
	  }
	  // We cannot reconnect a secure socket.
	  if (!this.max_attempts || this.ssl) {
	    self.emit("close");
	    return;
	  }

	  if (this.retry_max_delay !== null && this.retry_delay >= this.retry_max_delay) {
	    this.retry_delay = this.retry_max_delay;
	  } else {
	    this.retry_delay = Math.floor(this.retry_delay * this.retry_backoff);
	  }

	  if (self._debug) {
	    console.log("Retry connection in " + this.retry_delay + " ms");
	  }

	  if (this.max_attempts && this.attempts >= this.max_attempts) {
	    this.retry_timer = null;
	    console.error("thrift: Couldn't get thrift connection after " + this.max_attempts + " attempts.");
	    self.emit("close");
	    return;
	  }

	  this.attempts += 1;
	  this.emit("reconnecting", {
	    delay: self.retry_delay,
	    attempt: self.attempts
	  });

	  this.retry_timer = setTimeout(function () {
	    if (self._debug) {
	       console.log("Retrying connection...");
		}

	    self.retry_totaltime += self.retry_delay;

	    if (self.connect_timeout && self.retry_totaltime >= self.connect_timeout) {
	       self.retry_timer = null;
	       console.error("thrift: Couldn't get thrift connection after " + self.retry_totaltime + "ms.");
	       self.emit("close");
	       return;
	    }

	    self.connection.connect(self.port, self.host);
	    self.retry_timer = null;
	  }, this.retry_delay);
	};

	exports.createConnection = function(host, port, options) {
	  var stream = net.createConnection(port, host);
	  var connection = new Connection(stream, options);
	  connection.host = host;
	  connection.port = port;

	  return connection;
	};

	exports.createSSLConnection = function(host, port, options) {
	  var stream = tls.connect(port, host, options);
	  var connection = new Connection(stream, options);
	  connection.host = host;
	  connection.port = port;

	  return connection;
	};


	exports.createClient = createClient;

	var child_process = __webpack_require__(15);
	var StdIOConnection = exports.StdIOConnection = function(command, options) {
	  var command_parts = command.split(' ');
	  command = command_parts[0];
	  var args = command_parts.splice(1,command_parts.length -1);
	  var child = this.child = child_process.spawn(command,args);

	  var self = this;
	  EventEmitter.call(this);

	  this._debug = options.debug || false;
	  this.connection = child.stdin;
	  this.options = options || {};
	  this.transport = this.options.transport || TBufferedTransport;
	  this.protocol = this.options.protocol || TBinaryProtocol;
	  this.offline_queue = [];

	  if(this._debug === true){
	    this.child.stderr.on('data',function(err){
	      console.log(err.toString(),'CHILD ERROR');
	    });

	    this.child.on('exit',function(code,signal){
	      console.log(code+':'+signal,'CHILD EXITED');
	    });
	  }

	  this.frameLeft = 0;
	  this.framePos = 0;
	  this.frame = null;
	  this.connected = true;

	  self.offline_queue.forEach(function(data) {
	      self.connection.write(data);
	  });


	  this.connection.addListener("error", function(err) {
	    self.emit("error", err);
	  });

	  // Add a close listener
	  this.connection.addListener("close", function() {
	    self.emit("close");
	  });

	  child.stdout.addListener("data", self.transport.receiver(function(transport_with_data) {
	    var message = new self.protocol(transport_with_data);
	    try {
	      var header = message.readMessageBegin();
	      var dummy_seqid = header.rseqid * -1;
	      var client = self.client;
	      client._reqs[dummy_seqid] = function(err, success){
	        transport_with_data.commitPosition();

	        var callback = client._reqs[header.rseqid];
	        delete client._reqs[header.rseqid];
	        if (callback) {
	          callback(err, success);
	        }
	      };
	      client['recv_' + header.fname](message, header.mtype, dummy_seqid);
	    }
	    catch (e) {
	      if (e instanceof InputBufferUnderrunError) {
	        transport_with_data.rollbackPosition();
	      }
	      else {
	        throw e;
	      }
	    }
	  }));
	};

	util.inherits(StdIOConnection, EventEmitter);

	StdIOConnection.prototype.end = function() {
	  this.connection.end();
	};

	StdIOConnection.prototype.write = function(data) {
	  if (!this.connected) {
	    this.offline_queue.push(data);
	    return;
	  }
	  this.connection.write(data);
	};

	exports.createStdIOConnection = function(command,options){
	  return new StdIOConnection(command,options);
	};

	exports.createStdIOClient = createClient;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("events");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("net");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("tls");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	var binary = __webpack_require__(9);
	var InputBufferUnderrunError = __webpack_require__(10);

	module.exports = TBufferedTransport;

	function TBufferedTransport(buffer, callback) {
	  this.defaultReadBufferSize = 1024;
	  this.writeBufferSize = 512; // Soft Limit
	  this.inBuf = new Buffer(this.defaultReadBufferSize);
	  this.readCursor = 0;
	  this.writeCursor = 0; // for input buffer
	  this.outBuffers = [];
	  this.outCount = 0;
	  this.onFlush = callback;
	};

	TBufferedTransport.receiver = function(callback, seqid) {
	  var reader = new TBufferedTransport();

	  return function(data) {
	    if (reader.writeCursor + data.length > reader.inBuf.length) {
	      var buf = new Buffer(reader.writeCursor + data.length);
	      reader.inBuf.copy(buf, 0, 0, reader.writeCursor);
	      reader.inBuf = buf;
	    }
	    data.copy(reader.inBuf, reader.writeCursor, 0);
	    reader.writeCursor += data.length;

	    callback(reader, seqid);
	  };
	};


	TBufferedTransport.prototype.commitPosition = function(){
	  var unreadSize = this.writeCursor - this.readCursor;
	  var bufSize = (unreadSize * 2 > this.defaultReadBufferSize) ?
	    unreadSize * 2 : this.defaultReadBufferSize;
	  var buf = new Buffer(bufSize);
	  if (unreadSize > 0) {
	    this.inBuf.copy(buf, 0, this.readCursor, this.writeCursor);
	  }
	  this.readCursor = 0;
	  this.writeCursor = unreadSize;
	  this.inBuf = buf;
	};

	TBufferedTransport.prototype.rollbackPosition = function(){
	  this.readCursor = 0;
	}

	  // TODO: Implement open/close support
	TBufferedTransport.prototype.isOpen = function() {
	  return true;
	};

	TBufferedTransport.prototype.open = function() {
	};

	TBufferedTransport.prototype.close = function() {
	};

	  // Set the seqid of the message in the client
	  // So that callbacks can be found
	TBufferedTransport.prototype.setCurrSeqId = function(seqid) {
	  this._seqid = seqid;
	};

	TBufferedTransport.prototype.ensureAvailable = function(len) {
	  if (this.readCursor + len > this.writeCursor) {
	    throw new InputBufferUnderrunError();
	  }
	};

	TBufferedTransport.prototype.read = function(len) {
	  this.ensureAvailable(len);
	  var buf = new Buffer(len);
	  this.inBuf.copy(buf, 0, this.readCursor, this.readCursor + len);
	  this.readCursor += len;
	  return buf;
	};

	TBufferedTransport.prototype.readByte = function() {
	  this.ensureAvailable(1);
	  return binary.readByte(this.inBuf[this.readCursor++]);
	};

	TBufferedTransport.prototype.readI16 = function() {
	  this.ensureAvailable(2);
	  var i16 = binary.readI16(this.inBuf, this.readCursor);
	  this.readCursor += 2;
	  return i16;
	};

	TBufferedTransport.prototype.readI32 = function() {
	  this.ensureAvailable(4);
	  var i32 = binary.readI32(this.inBuf, this.readCursor);
	  this.readCursor += 4;
	  return i32;
	};

	TBufferedTransport.prototype.readDouble = function() {
	  this.ensureAvailable(8);
	  var d = binary.readDouble(this.inBuf, this.readCursor);
	  this.readCursor += 8;
	  return d;
	};

	TBufferedTransport.prototype.readString = function(len) {
	  this.ensureAvailable(len);
	  var str = this.inBuf.toString('utf8', this.readCursor, this.readCursor + len);
	  this.readCursor += len;
	  return str;
	};

	TBufferedTransport.prototype.borrow = function() {
	  var obj = {buf: this.inBuf, readIndex: this.readCursor, writeIndex: this.writeCursor};
	  return obj;
	};

	TBufferedTransport.prototype.consume = function(bytesConsumed) {
	  this.readCursor += bytesConsumed;
	};

	TBufferedTransport.prototype.write = function(buf) {
	  if (typeof(buf) === "string") {
	    buf = new Buffer(buf, 'utf8');
	  }
	  this.outBuffers.push(buf);
	  this.outCount += buf.length;
	};

	TBufferedTransport.prototype.flush = function() {
	  // If the seqid of the callback is available pass it to the onFlush
	  // Then remove the current seqid
	  var seqid = this._seqid;
	  this._seqid = null;

	  if (this.outCount < 1) {
	    return;
	  }

	  var msg = new Buffer(this.outCount),
	      pos = 0;
	  this.outBuffers.forEach(function(buf) {
	    buf.copy(msg, pos, 0);
	    pos += buf.length;
	  });

	  if (this.onFlush) {
	    // Passing seqid through this call to get it to the connection
	    this.onFlush(msg, seqid);
	  }

	  this.outBuffers = [];
	  this.outCount = 0;
	}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	var POW_8 = Math.pow(2, 8);
	var POW_16 = Math.pow(2, 16);
	var POW_24 = Math.pow(2, 24);
	var POW_32 = Math.pow(2, 32);
	var POW_40 = Math.pow(2, 40);
	var POW_48 = Math.pow(2, 48);
	var POW_52 = Math.pow(2, 52);
	var POW_1022 = Math.pow(2, 1022);

	exports.readByte = function(b){
		return b > 127 ? b-256 : b;
	};

	exports.readI16 = function(buff, off) {
	  off = off || 0;
	  var v = buff[off + 1];
	  v += buff[off] << 8;
	  if (buff[off] & 128) {
	    v -= POW_16;
	  }
	  return v;
	};

	exports.readI32 = function(buff, off) {
	  off = off || 0;
	  var v = buff[off + 3];
	  v += buff[off + 2] << 8;
	  v += buff[off + 1] << 16;
	  v += buff[off] * POW_24;
	  if (buff[off] & 0x80) {
	    v -= POW_32;
	  }
	  return v;
	};

	exports.writeI16 = function(buff, v) {
	  buff[1] = v & 0xff;
	  v >>= 8;
	  buff[0] = v & 0xff;
	  return buff;
	};

	exports.writeI32 = function(buff, v) {
	  buff[3] = v & 0xff;
	  v >>= 8;
	  buff[2] = v & 0xff;
	  v >>= 8;
	  buff[1] = v & 0xff;
	  v >>= 8;
	  buff[0] = v & 0xff;
	  return buff;
	};

	exports.readDouble = function(buff, off) {
	  off = off || 0;
	  var signed = buff[off] & 0x80;
	  var e = (buff[off+1] & 0xF0) >> 4;
	  e += (buff[off] & 0x7F) << 4;

	  var m = buff[off+7];
	  m += buff[off+6] << 8;
	  m += buff[off+5] << 16;
	  m += buff[off+4] * POW_24;
	  m += buff[off+3] * POW_32;
	  m += buff[off+2] * POW_40;
	  m += (buff[off+1] & 0x0F) * POW_48;

	  switch (e) {
	    case 0:
	      e = -1022;
	      break;
	    case 2047:
	      return m ? NaN : (signed ? -Infinity : Infinity);
	    default:
	      m += POW_52;
	      e -= 1023;
	  }

	  if (signed) {
	    m *= -1;
	  }

	  return m * Math.pow(2, e - 52);
	};

	/*
	 * Based on code from the jspack module:
	 * http://code.google.com/p/jspack/
	 */
	exports.writeDouble = function(buff, v) {
	  var m, e, c;

	  buff[0] = (v < 0 ? 0x80 : 0x00);

	  v = Math.abs(v);
	  if (v !== v) {
	    // NaN, use QNaN IEEE format
	    m = 2251799813685248;
	    e = 2047;
	  } else if (v === Infinity) {
	    m = 0;
	    e = 2047;
	  } else {
	    e = Math.floor(Math.log(v) / Math.LN2);
	    c = Math.pow(2, -e);
	    if (v * c < 1) {
	      e--;
	      c *= 2;
	    }

	    if (e + 1023 >= 2047)
	    {
	      // Overflow
	      m = 0;
	      e = 2047;
	    }
	    else if (e + 1023 >= 1)
	    {
	      // Normalized - term order matters, as Math.pow(2, 52-e) and v*Math.pow(2, 52) can overflow
	      m = (v*c-1) * POW_52;
	      e += 1023;
	    }
	    else
	    {
	      // Denormalized - also catches the '0' case, somewhat by chance
	      m = (v * POW_1022) * POW_52;
	      e = 0;
	    }
	  }

	  buff[1] = (e << 4) & 0xf0;
	  buff[0] |= (e >> 4) & 0x7f;

	  buff[7] = m & 0xff;
	  m = Math.floor(m / POW_8);
	  buff[6] = m & 0xff;
	  m = Math.floor(m / POW_8);
	  buff[5] = m & 0xff;
	  m = Math.floor(m / POW_8);
	  buff[4] = m & 0xff;
	  m >>= 8;
	  buff[3] = m & 0xff;
	  m >>= 8;
	  buff[2] = m & 0xff;
	  m >>= 8;
	  buff[1] |= m & 0x0f;

	  return buff;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var util = __webpack_require__(3);

	module.exports = InputBufferUnderrunError;

	function InputBufferUnderrunError(message) {
	  Error.call(this);
	  Error.captureStackTrace(this, this.constructor);
	  this.name = this.constructor.name;
	  this.message = message;
	};

	util.inherits(InputBufferUnderrunError, Error);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	var log = __webpack_require__(12);
	var binary = __webpack_require__(9);
	var Int64 = __webpack_require__(13);
	var Thrift = __webpack_require__(2);
	var Type = Thrift.Type;

	module.exports = TBinaryProtocol;

	// JavaScript supports only numeric doubles, therefore even hex values are always signed.
	// The largest integer value which can be represented in JavaScript is +/-2^53.
	// Bitwise operations convert numbers to 32 bit integers but perform sign extension
	// upon assigning values back to variables.
	var VERSION_MASK = -65536,   // 0xffff0000
	    VERSION_1 = -2147418112, // 0x80010000
	    TYPE_MASK = 0x000000ff;

	function TBinaryProtocol(trans, strictRead, strictWrite) {
	  this.trans = trans;
	  this.strictRead = (strictRead !== undefined ? strictRead : false);
	  this.strictWrite = (strictWrite !== undefined ? strictWrite : true);
	};

	TBinaryProtocol.prototype.flush = function() {
	  return this.trans.flush();
	};

	TBinaryProtocol.prototype.writeMessageBegin = function(name, type, seqid) {
	    if (this.strictWrite) {
	      this.writeI32(VERSION_1 | type);
	      this.writeString(name);
	      this.writeI32(seqid);
	    } else {
	      this.writeString(name);
	      this.writeByte(type);
	      this.writeI32(seqid);
	    }
	    // Record client seqid to find callback again
	    if (this._seqid) {
	      // TODO better logging log warning
	      log.warning('SeqId already set', { 'name': name });
	    } else {
	      this._seqid = seqid;
	      this.trans.setCurrSeqId(seqid);
	    }
	};

	TBinaryProtocol.prototype.writeMessageEnd = function() {
	    if (this._seqid) {
	        this._seqid = null;
	    } else {
	        log.warning('No seqid to unset');
	    }
	};

	TBinaryProtocol.prototype.writeStructBegin = function(name) {
	};

	TBinaryProtocol.prototype.writeStructEnd = function() {
	};

	TBinaryProtocol.prototype.writeFieldBegin = function(name, type, id) {
	  this.writeByte(type);
	  this.writeI16(id);
	};

	TBinaryProtocol.prototype.writeFieldEnd = function() {
	};

	TBinaryProtocol.prototype.writeFieldStop = function() {
	  this.writeByte(Type.STOP);
	};

	TBinaryProtocol.prototype.writeMapBegin = function(ktype, vtype, size) {
	  this.writeByte(ktype);
	  this.writeByte(vtype);
	  this.writeI32(size);
	};

	TBinaryProtocol.prototype.writeMapEnd = function() {
	};

	TBinaryProtocol.prototype.writeListBegin = function(etype, size) {
	  this.writeByte(etype);
	  this.writeI32(size);
	};

	TBinaryProtocol.prototype.writeListEnd = function() {
	};

	TBinaryProtocol.prototype.writeSetBegin = function(etype, size) {
	  this.writeByte(etype);
	  this.writeI32(size);
	};

	TBinaryProtocol.prototype.writeSetEnd = function() {
	};

	TBinaryProtocol.prototype.writeBool = function(bool) {
	  if (bool) {
	    this.writeByte(1);
	  } else {
	    this.writeByte(0);
	  }
	};

	TBinaryProtocol.prototype.writeByte = function(b) {
	  this.trans.write(new Buffer([b]));
	};

	TBinaryProtocol.prototype.writeI16 = function(i16) {
	  this.trans.write(binary.writeI16(new Buffer(2), i16));
	};

	TBinaryProtocol.prototype.writeI32 = function(i32) {
	  this.trans.write(binary.writeI32(new Buffer(4), i32));
	};

	TBinaryProtocol.prototype.writeI64 = function(i64) {
	  if (i64.buffer) {
	    this.trans.write(i64.buffer);
	  } else {
	    this.trans.write(new Int64(i64).buffer);
	  }
	};

	TBinaryProtocol.prototype.writeDouble = function(dub) {
	  this.trans.write(binary.writeDouble(new Buffer(8), dub));
	};

	TBinaryProtocol.prototype.writeStringOrBinary = function(name, encoding, arg) {
	  if (typeof(arg) === 'string') {
	    this.writeI32(Buffer.byteLength(arg, encoding));
	    this.trans.write(new Buffer(arg, encoding));
	  } else if ((arg instanceof Buffer) ||
	             (Object.prototype.toString.call(arg) == '[object Uint8Array]')) {
	    // Buffers in Node.js under Browserify may extend UInt8Array instead of
	    // defining a new object. We detect them here so we can write them
	    // correctly
	    this.writeI32(arg.length);
	    this.trans.write(arg);
	  } else {
	    throw new Error(name + ' called without a string/Buffer argument: ' + arg);
	  }
	};

	TBinaryProtocol.prototype.writeString = function(arg) {
	  this.writeStringOrBinary('writeString', 'utf8', arg);
	};

	TBinaryProtocol.prototype.writeBinary = function(arg) {
	  this.writeStringOrBinary('writeBinary', 'binary', arg);
	};

	TBinaryProtocol.prototype.readMessageBegin = function() {
	  var sz = this.readI32();
	  var type, name, seqid;

	  if (sz < 0) {
	    var version = sz & VERSION_MASK;
	    if (version != VERSION_1) {
	      console.log("BAD: " + version);
	      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.BAD_VERSION, "Bad version in readMessageBegin: " + sz);
	    }
	    type = sz & TYPE_MASK;
	    name = this.readString();
	    seqid = this.readI32();
	  } else {
	    if (this.strictRead) {
	      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.BAD_VERSION, "No protocol version header");
	    }
	    name = this.trans.read(sz);
	    type = this.readByte();
	    seqid = this.readI32();
	  }
	  return {fname: name, mtype: type, rseqid: seqid};
	};

	TBinaryProtocol.prototype.readMessageEnd = function() {
	};

	TBinaryProtocol.prototype.readStructBegin = function() {
	  return {fname: ''};
	};

	TBinaryProtocol.prototype.readStructEnd = function() {
	};

	TBinaryProtocol.prototype.readFieldBegin = function() {
	  var type = this.readByte();
	  if (type == Type.STOP) {
	    return {fname: null, ftype: type, fid: 0};
	  }
	  var id = this.readI16();
	  return {fname: null, ftype: type, fid: id};
	};

	TBinaryProtocol.prototype.readFieldEnd = function() {
	};

	TBinaryProtocol.prototype.readMapBegin = function() {
	  var ktype = this.readByte();
	  var vtype = this.readByte();
	  var size = this.readI32();
	  return {ktype: ktype, vtype: vtype, size: size};
	};

	TBinaryProtocol.prototype.readMapEnd = function() {
	};

	TBinaryProtocol.prototype.readListBegin = function() {
	  var etype = this.readByte();
	  var size = this.readI32();
	  return {etype: etype, size: size};
	};

	TBinaryProtocol.prototype.readListEnd = function() {
	};

	TBinaryProtocol.prototype.readSetBegin = function() {
	  var etype = this.readByte();
	  var size = this.readI32();
	  return {etype: etype, size: size};
	};

	TBinaryProtocol.prototype.readSetEnd = function() {
	};

	TBinaryProtocol.prototype.readBool = function() {
	  var b = this.readByte();
	  if (b === 0) {
	    return false;
	  }
	  return true;
	};

	TBinaryProtocol.prototype.readByte = function() {
	  return this.trans.readByte();
	};

	TBinaryProtocol.prototype.readI16 = function() {
	  return this.trans.readI16();
	};

	TBinaryProtocol.prototype.readI32 = function() {
	  return this.trans.readI32();
	};

	TBinaryProtocol.prototype.readI64 = function() {
	  var buff = this.trans.read(8);
	  return new Int64(buff);
	};

	TBinaryProtocol.prototype.readDouble = function() {
	  return this.trans.readDouble();
	};

	TBinaryProtocol.prototype.readBinary = function() {
	  var len = this.readI32();
	  if (len === 0) {
	    return new Buffer(0);
	  }

	  if (len < 0) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, "Negative binary size");
	  }
	  return this.trans.read(len);
	};

	TBinaryProtocol.prototype.readString = function() {
	  var len = this.readI32();
	  if (len === 0) {
	    return "";
	  }

	  if (len < 0) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, "Negative string size");
	  }
	  return this.trans.readString(len);
	};

	TBinaryProtocol.prototype.getTransport = function() {
	  return this.trans;
	};

	TBinaryProtocol.prototype.skip = function(type) {
	  switch (type) {
	    case Type.STOP:
	      return;
	    case Type.BOOL:
	      this.readBool();
	      break;
	    case Type.BYTE:
	      this.readByte();
	      break;
	    case Type.I16:
	      this.readI16();
	      break;
	    case Type.I32:
	      this.readI32();
	      break;
	    case Type.I64:
	      this.readI64();
	      break;
	    case Type.DOUBLE:
	      this.readDouble();
	      break;
	    case Type.STRING:
	      this.readString();
	      break;
	    case Type.STRUCT:
	      this.readStructBegin();
	      while (true) {
	        var r = this.readFieldBegin();
	        if (r.ftype === Type.STOP) {
	          break;
	        }
	        this.skip(r.ftype);
	        this.readFieldEnd();
	      }
	      this.readStructEnd();
	      break;
	    case Type.MAP:
	      var mapBegin = this.readMapBegin();
	      for (var i = 0; i < mapBegin.size; ++i) {
	        this.skip(mapBegin.ktype);
	        this.skip(mapBegin.vtype);
	      }
	      this.readMapEnd();
	      break;
	    case Type.SET:
	      var setBegin = this.readSetBegin();
	      for (var i2 = 0; i2 < setBegin.size; ++i2) {
	        this.skip(setBegin.etype);
	      }
	      this.readSetEnd();
	      break;
	    case Type.LIST:
	      var listBegin = this.readListBegin();
	      for (var i3 = 0; i3 < listBegin.size; ++i3) {
	        this.skip(listBegin.etype);
	      }
	      this.readListEnd();
	      break;
	    default:
	      throw new  Error("Invalid type: " + type);
	  }
	};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	module.exports = {
	  'info' : function logInfo() {},
	  'warning' : function logWarning() {},
	  'error' : function logError() {},
	  'debug' : function logDebug() {},
	  'trace' : function logTrace() {}
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	//     Int64.js
	//
	//     Copyright (c) 2012 Robert Kieffer
	//     MIT License - http://opensource.org/licenses/mit-license.php

	/**
	 * Support for handling 64-bit int numbers in Javascript (node.js)
	 *
	 * JS Numbers are IEEE-754 binary double-precision floats, which limits the
	 * range of values that can be represented with integer precision to:
	 *
	 * 2^^53 <= N <= 2^53
	 *
	 * Int64 objects wrap a node Buffer that holds the 8-bytes of int64 data.  These
	 * objects operate directly on the buffer which means that if they are created
	 * using an existing buffer then setting the value will modify the Buffer, and
	 * vice-versa.
	 *
	 * Internal Representation
	 *
	 * The internal buffer format is Big Endian.  I.e. the most-significant byte is
	 * at buffer[0], the least-significant at buffer[7].  For the purposes of
	 * converting to/from JS native numbers, the value is assumed to be a signed
	 * integer stored in 2's complement form.
	 *
	 * For details about IEEE-754 see:
	 * http://en.wikipedia.org/wiki/Double_precision_floating-point_format
	 */

	// Useful masks and values for bit twiddling
	var MASK31 =  0x7fffffff, VAL31 = 0x80000000;
	var MASK32 =  0xffffffff, VAL32 = 0x100000000;

	// Map for converting hex octets to strings
	var _HEX = [];
	for (var i = 0; i < 256; i++) {
	  _HEX[i] = (i > 0xF ? '' : '0') + i.toString(16);
	}

	//
	// Int64
	//

	/**
	 * Constructor accepts any of the following argument types:
	 *
	 * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
	 * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
	 * new Int64(string)             - Hex string (throws if n is outside int64 range)
	 * new Int64(number)             - Number (throws if n is outside int64 range)
	 * new Int64(hi, lo)             - Raw bits as two 32-bit values
	 */
	var Int64 = module.exports = function(a1, a2) {
	  if (a1 instanceof Buffer) {
	    this.buffer = a1;
	    this.offset = a2 || 0;
	  } else if (Object.prototype.toString.call(a1) == '[object Uint8Array]') {
	    // Under Browserify, Buffers can extend Uint8Arrays rather than an
	    // instance of Buffer. We could assume the passed in Uint8Array is actually
	    // a buffer but that won't handle the case where a raw Uint8Array is passed
	    // in. We construct a new Buffer just in case.
	    this.buffer = new Buffer(a1);
	    this.offset = a2 || 0;
	  } else {
	    this.buffer = this.buffer || new Buffer(8);
	    this.offset = 0;
	    this.setValue.apply(this, arguments);
	  }
	};


	// Max integer value that JS can accurately represent
	Int64.MAX_INT = Math.pow(2, 53);

	// Min integer value that JS can accurately represent
	Int64.MIN_INT = -Math.pow(2, 53);

	Int64.prototype = {
	  /**
	   * Do in-place 2's compliment.  See
	   * http://en.wikipedia.org/wiki/Two's_complement
	   */
	  _2scomp: function() {
	    var b = this.buffer, o = this.offset, carry = 1;
	    for (var i = o + 7; i >= o; i--) {
	      var v = (b[i] ^ 0xff) + carry;
	      b[i] = v & 0xff;
	      carry = v >> 8;
	    }
	  },

	  /**
	   * Set the value. Takes any of the following arguments:
	   *
	   * setValue(string) - A hexidecimal string
	   * setValue(number) - Number (throws if n is outside int64 range)
	   * setValue(hi, lo) - Raw bits as two 32-bit values
	   */
	  setValue: function(hi, lo) {
	    var negate = false;
	    if (arguments.length == 1) {
	      if (typeof(hi) == 'number') {
	        // Simplify bitfield retrieval by using abs() value.  We restore sign
	        // later
	        negate = hi < 0;
	        hi = Math.abs(hi);
	        lo = hi % VAL32;
	        hi = hi / VAL32;
	        if (hi > VAL32) throw new RangeError(hi  + ' is outside Int64 range');
	        hi = hi | 0;
	      } else if (typeof(hi) == 'string') {
	        hi = (hi + '').replace(/^0x/, '');
	        lo = hi.substr(-8);
	        hi = hi.length > 8 ? hi.substr(0, hi.length - 8) : '';
	        hi = parseInt(hi, 16);
	        lo = parseInt(lo, 16);
	      } else {
	        throw new Error(hi + ' must be a Number or String');
	      }
	    }

	    // Technically we should throw if hi or lo is outside int32 range here, but
	    // it's not worth the effort. Anything past the 32'nd bit is ignored.

	    // Copy bytes to buffer
	    var b = this.buffer, o = this.offset;
	    for (var i = 7; i >= 0; i--) {
	      b[o+i] = lo & 0xff;
	      lo = i == 4 ? hi : lo >>> 8;
	    }

	    // Restore sign of passed argument
	    if (negate) this._2scomp();
	  },

	  /**
	   * Convert to a native JS number.
	   *
	   * WARNING: Do not expect this value to be accurate to integer precision for
	   * large (positive or negative) numbers!
	   *
	   * @param allowImprecise If true, no check is performed to verify the
	   * returned value is accurate to integer precision.  If false, imprecise
	   * numbers (very large positive or negative numbers) will be forced to +/-
	   * Infinity.
	   */
	  toNumber: function(allowImprecise) {
	    var b = this.buffer, o = this.offset;

	    // Running sum of octets, doing a 2's complement
	    var negate = b[o] & 0x80, x = 0, carry = 1;
	    for (var i = 7, m = 1; i >= 0; i--, m *= 256) {
	      var v = b[o+i];

	      // 2's complement for negative numbers
	      if (negate) {
	        v = (v ^ 0xff) + carry;
	        carry = v >> 8;
	        v = v & 0xff;
	      }

	      x += v * m;
	    }

	    // Return Infinity if we've lost integer precision
	    if (!allowImprecise && x >= Int64.MAX_INT) {
	      return negate ? -Infinity : Infinity;
	    }

	    return negate ? -x : x;
	  },

	  /**
	   * Convert to a JS Number. Returns +/-Infinity for values that can't be
	   * represented to integer precision.
	   */
	  valueOf: function() {
	    return this.toNumber(false);
	  },

	  /**
	   * Return string value
	   *
	   * @param radix Just like Number#toString()'s radix
	   */
	  toString: function(radix) {
	    return this.valueOf().toString(radix || 10);
	  },

	  /**
	   * Return a string showing the buffer octets, with MSB on the left.
	   *
	   * @param sep separator string. default is '' (empty string)
	   */
	  toOctetString: function(sep) {
	    var out = new Array(8);
	    var b = this.buffer, o = this.offset;
	    for (var i = 0; i < 8; i++) {
	      out[i] = _HEX[b[o+i]];
	    }
	    return out.join(sep || '');
	  },

	  /**
	   * Returns the int64's 8 bytes in a buffer.
	   *
	   * @param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
	   *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
	   */
	  toBuffer: function(rawBuffer) {
	    if (rawBuffer && this.offset === 0) return this.buffer;

	    var out = new Buffer(8);
	    this.buffer.copy(out, 0, this.offset, this.offset + 8);
	    return out;
	  },

	  /**
	   * Copy 8 bytes of int64 into target buffer at target offset.
	   *
	   * @param {Buffer} targetBuffer       Buffer to copy into.
	   * @param {number} [targetOffset=0]   Offset into target buffer.
	   */
	  copy: function(targetBuffer, targetOffset) {
	    this.buffer.copy(targetBuffer, targetOffset || 0, this.offset, this.offset + 8);
	  },

	  /**
	   * Pretty output in console.log
	   */
	  inspect: function() {
	    return '[Int64 value:' + this + ' octets:' + this.toOctetString(' ') + ']';
	  }
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	module.exports = createClient;

	/**
	 * Creates a new client object for the specified Thrift service.
	 * @param {object} ServiceClient - The module containing the generated service client
	 * @param {Connection} Connection - The connection to use.
	 * @returns {object} The client object.
	 */
	function createClient(ServiceClient, connection) {
	  // TODO validate required options and throw otherwise
	  if (ServiceClient.Client) {
	    ServiceClient = ServiceClient.Client;
	  }
	  // TODO detangle these initialization calls
	  // creating "client" requires
	  //   - new service client instance
	  //
	  // New service client instance requires
	  //   - new transport instance
	  //   - protocol class reference
	  //
	  // New transport instance requires
	  //   - Buffer to use (or none)
	  //   - Callback to call on flush

	  // Wrap the write method
	  var writeCb = function(buf, seqid) {
	    connection.write(buf, seqid);
	  };
	  var transport = new connection.transport(undefined, writeCb);
	  var client = new ServiceClient(transport, connection.protocol);
	  transport.client = client;
	  connection.client = client;
	  return client;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("child_process");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var util = __webpack_require__(3);
	var http = __webpack_require__(17);
	var https = __webpack_require__(18);
	var EventEmitter = __webpack_require__(5).EventEmitter;
	var thrift = __webpack_require__(2);

	var TBufferedTransport = __webpack_require__(8);
	var TBinaryProtocol = __webpack_require__(11);
	var InputBufferUnderrunError = __webpack_require__(10);

	var createClient = __webpack_require__(14);

	/**
	 * @class
	 * @name ConnectOptions
	 * @property {string} transport - The Thrift layered transport to use (TBufferedTransport, etc).
	 * @property {string} protocol - The Thrift serialization protocol to use (TBinaryProtocol, etc.).
	 * @property {string} path - The URL path to POST to (e.g. "/", "/mySvc", "/thrift/quoteSvc", etc.).
	 * @property {object} headers - A standard Node.js header hash, an object hash containing key/value
	 *        pairs where the key is the header name string and the value is the header value string.
	 * @property {boolean} https - True causes the connection to use https, otherwise http is used.
	 * @property {object} nodeOptions - Options passed on to node.
	 * @example
	 *     //Use a connection that requires ssl/tls, closes the connection after each request,
	 *     //  uses the buffered transport layer, uses the JSON protocol and directs RPC traffic
	 *     //  to https://thrift.example.com:9090/hello
	 *     var thrift = require('thrift');
	 *     var options = {
	 *        transport: thrift.TBufferedTransport,
	 *        protocol: thrift.TJSONProtocol,
	 *        path: "/hello",
	 *        headers: {"Connection": "close"},
	 *        https: true
	 *     };
	 *     var con = thrift.createHttpConnection("thrift.example.com", 9090, options);
	 *     var client = thrift.createHttpClient(myService, connection);
	 *     client.myServiceFunction();
	 */

	/**
	 * Initializes a Thrift HttpConnection instance (use createHttpConnection() rather than
	 *    instantiating directly).
	 * @constructor
	 * @param {string} host - The host name or IP to connect to.
	 * @param {number} port - The TCP port to connect to.
	 * @param {ConnectOptions} options - The configuration options to use.
	 * @throws {error} Exceptions other than InputBufferUnderrunError are rethrown
	 * @event {error} The "error" event is fired when a Node.js error event occurs during
	 *     request or response processing, in which case the node error is passed on. An "error"
	 *     event may also be fired when the connection can not map a response back to the
	 *     appropriate client (an internal error), generating a TApplicationException.
	 * @classdesc HttpConnection objects provide Thrift end point transport
	 *     semantics implemented over the Node.js http.request() method.
	 * @see {@link createHttpConnection}
	 */
	var HttpConnection = exports.HttpConnection = function(host, port, options) {
	  //Initialize the emitter base object
	  EventEmitter.call(this);

	  //Set configuration
	  var self = this;
	  this.options = options || {};
	  this.host = host;
	  this.port = port;
	  this.https = this.options.https || false;
	  this.transport = this.options.transport || TBufferedTransport;
	  this.protocol = this.options.protocol || TBinaryProtocol;

	  //Prepare Node.js options
	  this.nodeOptions = {
	    host: this.host,
	    port: this.port || 80,
	    path: this.options.path || '/',
	    method: 'POST',
	    headers: this.options.headers || {},
	    responseType: this.options.responseType || null
	  };
	  for (var attrname in this.options.nodeOptions) {
	    this.nodeOptions[attrname] = this.options.nodeOptions[attrname];
	  }
	  /*jshint -W069 */
	  if (! this.nodeOptions.headers['Connection']) {
	    this.nodeOptions.headers['Connection'] = 'keep-alive';
	  }
	  /*jshint +W069 */

	  //The sequence map is used to map seqIDs back to the
	  //  calling client in multiplexed scenarios
	  this.seqId2Service = {};

	  function decodeCallback(transport_with_data) {
	    var proto = new self.protocol(transport_with_data);
	    try {
	      while (true) {
	        var header = proto.readMessageBegin();
	        var dummy_seqid = header.rseqid * -1;
	        var client = self.client;
	        //The Multiplexed Protocol stores a hash of seqid to service names
	        //  in seqId2Service. If the SeqId is found in the hash we need to
	        //  lookup the appropriate client for this call.
	        //  The client var is a single client object when not multiplexing,
	        //  when using multiplexing it is a service name keyed hash of client
	        //  objects.
	        //NOTE: The 2 way interdependencies between protocols, transports,
	        //  connections and clients in the Node.js implementation are irregular
	        //  and make the implementation difficult to extend and maintain. We
	        //  should bring this stuff inline with typical thrift I/O stack
	        //  operation soon.
	        //  --ra
	        var service_name = self.seqId2Service[header.rseqid];
	        if (service_name) {
	          client = self.client[service_name];
	          delete self.seqId2Service[header.rseqid];
	        }
	        /*jshint -W083 */
	        client._reqs[dummy_seqid] = function(err, success){
	          transport_with_data.commitPosition();
	          var clientCallback = client._reqs[header.rseqid];
	          delete client._reqs[header.rseqid];
	          if (clientCallback) {
	            process.nextTick(function() {
	              clientCallback(err, success);
	            });
	          }
	        };
	        /*jshint +W083 */
	        if(client['recv_' + header.fname]) {
	          client['recv_' + header.fname](proto, header.mtype, dummy_seqid);
	        } else {
	          delete client._reqs[dummy_seqid];
	          self.emit("error",
	                    new thrift.TApplicationException(
	                       thrift.TApplicationExceptionType.WRONG_METHOD_NAME,
	                       "Received a response to an unknown RPC function"));
	        }
	      }
	    }
	    catch (e) {
	      if (e instanceof InputBufferUnderrunError) {
	        transport_with_data.rollbackPosition();
	      } else {
	        self.emit('error', e);
	      }
	    }
	  }


	  //Response handler
	  //////////////////////////////////////////////////
	  this.responseCallback = function(response) {
	    var data = [];
	    var dataLen = 0;

	    response.on('error', function (e) {
	      self.emit("error", e);
	    });

	    // When running directly under node, chunk will be a buffer,
	    // however, when running in a Browser (e.g. Browserify), chunk
	    // will be a string or an ArrayBuffer.
	    response.on('data', function (chunk) {
	      if ((typeof chunk == 'string') ||
	          (Object.prototype.toString.call(chunk) == '[object Uint8Array]')) {
	        // Wrap ArrayBuffer/string in a Buffer so data[i].copy will work
	        data.push(new Buffer(chunk));
	      } else {
	        data.push(chunk);
	      }
	      dataLen += chunk.length;
	    });

	    response.on('end', function(){
	      var buf = new Buffer(dataLen);
	      for (var i=0, len=data.length, pos=0; i<len; i++) {
	        data[i].copy(buf, pos);
	        pos += data[i].length;
	      }
	      //Get the receiver function for the transport and
	      //  call it with the buffer
	      self.transport.receiver(decodeCallback)(buf);
	    });
	  };
	};
	util.inherits(HttpConnection, EventEmitter);

	/**
	 * Writes Thrift message data to the connection
	 * @param {Buffer} data - A Node.js Buffer containing the data to write
	 * @returns {void} No return value.
	 * @event {error} the "error" event is raised upon request failure passing the
	 *     Node.js error object to the listener.
	 */
	HttpConnection.prototype.write = function(data) {
	  var self = this;
	  self.nodeOptions.headers["Content-length"] = data.length;
	  var req = (self.https) ?
	      https.request(self.nodeOptions, self.responseCallback) :
	      http.request(self.nodeOptions, self.responseCallback);
	  req.on('error', function(err) {
	    self.emit("error", err);
	  });
	  req.write(data);
	  req.end();
	};

	/**
	 * Creates a new HttpConnection object, used by Thrift clients to connect
	 *    to Thrift HTTP based servers.
	 * @param {string} host - The host name or IP to connect to.
	 * @param {number} port - The TCP port to connect to.
	 * @param {ConnectOptions} options - The configuration options to use.
	 * @returns {HttpConnection} The connection object.
	 * @see {@link ConnectOptions}
	 */
	exports.createHttpConnection = function(host, port, options) {
	  return new HttpConnection(host, port, options);
	};

	exports.createHttpClient = createClient



/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("https");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var util = __webpack_require__(3);
	var WebSocket = __webpack_require__(20);
	var EventEmitter = __webpack_require__(5).EventEmitter;
	var thrift = __webpack_require__(2);
	var ttransport = __webpack_require__(38);
	var tprotocol = __webpack_require__(40);

	var TBufferedTransport = __webpack_require__(8);
	var TJSONProtocol = __webpack_require__(42);
	var InputBufferUnderrunError = __webpack_require__(10);

	var createClient = __webpack_require__(14);

	exports.WSConnection = WSConnection;

	/**
	 * @class
	 * @name WSConnectOptions
	 * @property {string} transport - The Thrift layered transport to use (TBufferedTransport, etc).
	 * @property {string} protocol - The Thrift serialization protocol to use (TJSONProtocol, etc.).
	 * @property {string} path - The URL path to connect to (e.g. "/", "/mySvc", "/thrift/quoteSvc", etc.).
	 * @property {object} headers - A standard Node.js header hash, an object hash containing key/value
	 *        pairs where the key is the header name string and the value is the header value string.
	 * @property {boolean} secure - True causes the connection to use wss, otherwise ws is used.
	 * @property {object} wsOptions - Options passed on to WebSocket.
	 * @example
	 *     //Use a secured websocket connection
	 *     //  uses the buffered transport layer, uses the JSON protocol and directs RPC traffic
	 *     //  to wss://thrift.example.com:9090/hello
	 *     var thrift = require('thrift');
	 *     var options = {
	 *        transport: thrift.TBufferedTransport,
	 *        protocol: thrift.TJSONProtocol,
	 *        path: "/hello",
	 *        secure: true
	 *     };
	 *     var con = thrift.createWSConnection("thrift.example.com", 9090, options);
	 *     con.open()
	 *     var client = thrift.createWSClient(myService, connection);
	 *     client.myServiceFunction();
	 *     con.close()
	 */

	/**
	 * Initializes a Thrift WSConnection instance (use createWSConnection() rather than
	 *    instantiating directly).
	 * @constructor
	 * @param {string} host - The host name or IP to connect to.
	 * @param {number} port - The TCP port to connect to.
	 * @param {WSConnectOptions} options - The configuration options to use.
	 * @throws {error} Exceptions other than ttransport.InputBufferUnderrunError are rethrown
	 * @event {error} The "error" event is fired when a Node.js error event occurs during
	 *     request or response processing, in which case the node error is passed on. An "error"
	 *     event may also be fired when the connectison can not map a response back to the
	 *     appropriate client (an internal error), generating a TApplicationException.
	 * @classdesc WSConnection objects provide Thrift end point transport
	 *     semantics implemented using Websockets.
	 * @see {@link createWSConnection}
	 */
	function WSConnection(host, port, options) {
	  //Initialize the emitter base object
	  EventEmitter.call(this);

	  //Set configuration
	  var self = this;
	  this.options = options || {};
	  this.host = host;
	  this.port = port;
	  this.secure = this.options.secure || false;
	  this.transport = this.options.transport || TBufferedTransport;
	  this.protocol = this.options.protocol || TJSONProtocol;
	  this.path = this.options.path;
	  this.send_pending = [];

	  //The sequence map is used to map seqIDs back to the
	  //  calling client in multiplexed scenarios
	  this.seqId2Service = {};

	  //Prepare WebSocket options
	  this.wsOptions = {
	    host: this.host,
	    port: this.port || 80,
	    path: this.options.path || '/',
	    headers: this.options.headers || {}
	  };
	  for (var attrname in this.options.wsOptions) {
	    this.wsOptions[attrname] = this.options.wsOptions[attrname];
	  }
	};
	util.inherits(WSConnection, EventEmitter);

	WSConnection.prototype.__reset = function() {
	  this.socket = null; //The web socket
	  this.send_pending = []; //Buffers/Callback pairs waiting to be sent
	};

	WSConnection.prototype.__onOpen = function() {
	  var self = this;
	  this.emit("open");
	  if (this.send_pending.length > 0) {
	    //If the user made calls before the connection was fully
	    //open, send them now
	    this.send_pending.forEach(function(data) {
	      self.socket.send(data);
	    });
	    this.send_pending = [];
	  }
	};

	WSConnection.prototype.__onClose = function(evt) {
	  this.emit("close");
	  this.__reset();
	};

	WSConnection.prototype.__decodeCallback = function(transport_with_data) {
	  var proto = new this.protocol(transport_with_data);
	  try {
	    while (true) {
	      var header = proto.readMessageBegin();
	      var dummy_seqid = header.rseqid * -1;
	      var client = this.client;
	      //The Multiplexed Protocol stores a hash of seqid to service names
	      //  in seqId2Service. If the SeqId is found in the hash we need to
	      //  lookup the appropriate client for this call.
	      //  The client var is a single client object when not multiplexing,
	      //  when using multiplexing it is a service name keyed hash of client
	      //  objects.
	      //NOTE: The 2 way interdependencies between protocols, transports,
	      //  connections and clients in the Node.js implementation are irregular
	      //  and make the implementation difficult to extend and maintain. We
	      //  should bring this stuff inline with typical thrift I/O stack
	      //  operation soon.
	      //  --ra
	      var service_name = this.seqId2Service[header.rseqid];
	      if (service_name) {
	        client = this.client[service_name];
	        delete this.seqId2Service[header.rseqid];
	      }
	      /*jshint -W083 */
	      client._reqs[dummy_seqid] = function(err, success) {
	        transport_with_data.commitPosition();
	        var clientCallback = client._reqs[header.rseqid];
	        delete client._reqs[header.rseqid];
	        if (clientCallback) {
	          clientCallback(err, success);
	        }
	      };
	      /*jshint +W083 */
	      if (client['recv_' + header.fname]) {
	        client['recv_' + header.fname](proto, header.mtype, dummy_seqid);
	      } else {
	        delete client._reqs[dummy_seqid];
	        this.emit("error",
	          new thrift.TApplicationException(
	            thrift.TApplicationExceptionType.WRONG_METHOD_NAME,
	            "Received a response to an unknown RPC function"));
	      }
	    }
	  } catch (e) {
	    if (e instanceof InputBufferUnderrunError) {
	      transport_with_data.rollbackPosition();
	    } else {
	      throw e;
	    }
	  }
	};

	WSConnection.prototype.__onData = function(data) {
	  if (Object.prototype.toString.call(data) == "[object ArrayBuffer]") {
	    data = new Uint8Array(data);
	  }
	  var buf = new Buffer(data);
	  this.transport.receiver(this.__decodeCallback.bind(this))(buf);

	};

	WSConnection.prototype.__onMessage = function(evt) {
	  this.__onData(evt.data);
	};

	WSConnection.prototype.__onError = function(evt) {
	  this.emit("error", evt);
	  this.socket.close();
	};

	/**
	 * Returns true if the transport is open
	 * @readonly
	 * @returns {boolean}
	 */
	WSConnection.prototype.isOpen = function() {
	  return this.socket && this.socket.readyState == this.socket.OPEN;
	};

	/**
	 * Opens the transport connection
	 */
	WSConnection.prototype.open = function() {
	  //If OPEN/CONNECTING/CLOSING ignore additional opens
	  if (this.socket && this.socket.readyState != this.socket.CLOSED) {
	    return;
	  }
	  //If there is no socket or the socket is closed:
	  this.socket = new WebSocket(this.uri(), "", this.wsOptions);
	  this.socket.binaryType = 'arraybuffer';
	  this.socket.onopen = this.__onOpen.bind(this);
	  this.socket.onmessage = this.__onMessage.bind(this);
	  this.socket.onerror = this.__onError.bind(this);
	  this.socket.onclose = this.__onClose.bind(this);
	};

	/**
	 * Closes the transport connection
	 */
	WSConnection.prototype.close = function() {
	  this.socket.close();
	};

	/**
	 * Return URI for the connection
	 * @returns {string} URI
	 */
	WSConnection.prototype.uri = function() {
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';
	  var path = this.path || '/';
	  var host = this.host;

	  // avoid port if default for schema
	  if (this.port && (('wss' == schema && this.port != 443) ||
	    ('ws' == schema && this.port != 80))) {
	    port = ':' + this.port;
	  }

	  return schema + '://' + host + port + path;
	};

	/**
	 * Writes Thrift message data to the connection
	 * @param {Buffer} data - A Node.js Buffer containing the data to write
	 * @returns {void} No return value.
	 * @event {error} the "error" event is raised upon request failure passing the
	 *     Node.js error object to the listener.
	 */
	WSConnection.prototype.write = function(data) {
	  if (this.isOpen()) {
	    //Send data and register a callback to invoke the client callback
	    this.socket.send(data);
	  } else {
	    //Queue the send to go out __onOpen
	    this.send_pending.push(data);
	  }
	};

	/**
	 * Creates a new WSConnection object, used by Thrift clients to connect
	 *    to Thrift HTTP based servers.
	 * @param {string} host - The host name or IP to connect to.
	 * @param {number} port - The TCP port to connect to.
	 * @param {WSConnectOptions} options - The configuration options to use.
	 * @returns {WSConnection} The connection object.
	 * @see {@link WSConnectOptions}
	 */
	exports.createWSConnection = function(host, port, options) {
	  return new WSConnection(host, port, options);
	};

	exports.createWSClient = createClient;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	module.exports = __webpack_require__(21);
	module.exports.Server = __webpack_require__(37);
	module.exports.Sender = __webpack_require__(27);
	module.exports.Receiver = __webpack_require__(31);

	module.exports.createServer = function (options, connectionListener) {
	  var server = new module.exports.Server(options);
	  if (typeof connectionListener === 'function') {
	    server.on('connection', connectionListener);
	  }
	  return server;
	};

	module.exports.connect = module.exports.createConnection = function (address, openListener) {
	  var client = new module.exports(address);
	  if (typeof openListener === 'function') {
	    client.on('open', openListener);
	  }
	  return client;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(3)
	  , events = __webpack_require__(5)
	  , http = __webpack_require__(17)
	  , https = __webpack_require__(18)
	  , crypto = __webpack_require__(22)
	  , url = __webpack_require__(23)
	  , stream = __webpack_require__(24)
	  , Options = __webpack_require__(25)
	  , Sender = __webpack_require__(27)
	  , Receiver = __webpack_require__(31)
	  , SenderHixie = __webpack_require__(35)
	  , ReceiverHixie = __webpack_require__(36);

	/**
	 * Constants
	 */

	// Default protocol version

	var protocolVersion = 13;

	// Close timeout

	var closeTimeout = 30000; // Allow 5 seconds to terminate the connection cleanly

	/**
	 * WebSocket implementation
	 */

	function WebSocket(address, protocols, options) {

	  if (protocols && !Array.isArray(protocols) && 'object' == typeof protocols) {
	    // accept the "options" Object as the 2nd argument
	    options = protocols;
	    protocols = null;
	  }
	  if ('string' == typeof protocols) {
	    protocols = [ protocols ];
	  }
	  if (!Array.isArray(protocols)) {
	    protocols = [];
	  }
	  // TODO: actually handle the `Sub-Protocols` part of the WebSocket client

	  this._socket = null;
	  this.bytesReceived = 0;
	  this.readyState = null;
	  this.supports = {};

	  if (Array.isArray(address)) {
	    initAsServerClient.apply(this, address.concat(options));
	  } else {
	    initAsClient.apply(this, [address, protocols, options]);
	  }
	}

	/**
	 * Inherits from EventEmitter.
	 */

	util.inherits(WebSocket, events.EventEmitter);

	/**
	 * Ready States
	 */

	["CONNECTING", "OPEN", "CLOSING", "CLOSED"].forEach(function (state, index) {
	    WebSocket.prototype[state] = WebSocket[state] = index;
	});

	/**
	 * Gracefully closes the connection, after sending a description message to the server
	 *
	 * @param {Object} data to be sent to the server
	 * @api public
	 */

	WebSocket.prototype.close = function(code, data) {
	  if (this.readyState == WebSocket.CLOSING || this.readyState == WebSocket.CLOSED) return;
	  if (this.readyState == WebSocket.CONNECTING) {
	    this.readyState = WebSocket.CLOSED;
	    return;
	  }
	  try {
	    this.readyState = WebSocket.CLOSING;
	    this._closeCode = code;
	    this._closeMessage = data;
	    var mask = !this._isServer;
	    this._sender.close(code, data, mask);
	  }
	  catch (e) {
	    this.emit('error', e);
	  }
	  finally {
	    this.terminate();
	  }
	}

	/**
	 * Pause the client stream
	 *
	 * @api public
	 */

	WebSocket.prototype.pause = function() {
	  if (this.readyState != WebSocket.OPEN) throw new Error('not opened');
	  return this._socket.pause();
	}

	/**
	 * Sends a ping
	 *
	 * @param {Object} data to be sent to the server
	 * @param {Object} Members - mask: boolean, binary: boolean
	 * @param {boolean} dontFailWhenClosed indicates whether or not to throw if the connection isnt open
	 * @api public
	 */

	WebSocket.prototype.ping = function(data, options, dontFailWhenClosed) {
	  if (this.readyState != WebSocket.OPEN) {
	    if (dontFailWhenClosed === true) return;
	    throw new Error('not opened');
	  }
	  options = options || {};
	  if (typeof options.mask == 'undefined') options.mask = !this._isServer;
	  this._sender.ping(data, options);
	}

	/**
	 * Sends a pong
	 *
	 * @param {Object} data to be sent to the server
	 * @param {Object} Members - mask: boolean, binary: boolean
	 * @param {boolean} dontFailWhenClosed indicates whether or not to throw if the connection isnt open
	 * @api public
	 */

	WebSocket.prototype.pong = function(data, options, dontFailWhenClosed) {
	  if (this.readyState != WebSocket.OPEN) {
	    if (dontFailWhenClosed === true) return;
	    throw new Error('not opened');
	  }
	  options = options || {};
	  if (typeof options.mask == 'undefined') options.mask = !this._isServer;
	  this._sender.pong(data, options);
	}

	/**
	 * Resume the client stream
	 *
	 * @api public
	 */

	WebSocket.prototype.resume = function() {
	  if (this.readyState != WebSocket.OPEN) throw new Error('not opened');
	  return this._socket.resume();
	}

	/**
	 * Sends a piece of data
	 *
	 * @param {Object} data to be sent to the server
	 * @param {Object} Members - mask: boolean, binary: boolean
	 * @param {function} Optional callback which is executed after the send completes
	 * @api public
	 */

	WebSocket.prototype.send = function(data, options, cb) {
	  if (typeof options == 'function') {
	    cb = options;
	    options = {};
	  }
	  if (this.readyState != WebSocket.OPEN) {
	    if (typeof cb == 'function') cb(new Error('not opened'));
	    else throw new Error('not opened');
	    return;
	  }
	  if (!data) data = '';
	  if (this._queue) {
	    var self = this;
	    this._queue.push(function() { self.send(data, options, cb); });
	    return;
	  }
	  options = options || {};
	  options.fin = true;
	  if (typeof options.binary == 'undefined') {
	    options.binary = (data instanceof ArrayBuffer || data instanceof Buffer ||
	      data instanceof Uint8Array ||
	      data instanceof Uint16Array ||
	      data instanceof Uint32Array ||
	      data instanceof Int8Array ||
	      data instanceof Int16Array ||
	      data instanceof Int32Array ||
	      data instanceof Float32Array ||
	      data instanceof Float64Array);
	  }
	  if (typeof options.mask == 'undefined') options.mask = !this._isServer;
	  var readable = typeof stream.Readable == 'function' ? stream.Readable : stream.Stream;
	  if (data instanceof readable) {
	    startQueue(this);
	    var self = this;
	    sendStream(this, data, options, function(error) {
	      process.nextTick(function() { executeQueueSends(self); });
	      if (typeof cb == 'function') cb(error);
	    });
	  }
	  else this._sender.send(data, options, cb);
	}

	/**
	 * Streams data through calls to a user supplied function
	 *
	 * @param {Object} Members - mask: boolean, binary: boolean
	 * @param {function} 'function (error, send)' which is executed on successive ticks of which send is 'function (data, final)'.
	 * @api public
	 */

	WebSocket.prototype.stream = function(options, cb) {
	  if (typeof options == 'function') {
	    cb = options;
	    options = {};
	  }
	  var self = this;
	  if (typeof cb != 'function') throw new Error('callback must be provided');
	  if (this.readyState != WebSocket.OPEN) {
	    if (typeof cb == 'function') cb(new Error('not opened'));
	    else throw new Error('not opened');
	    return;
	  }
	  if (this._queue) {
	    this._queue.push(function() { self.stream(options, cb); });
	    return;
	  }
	  options = options || {};
	  if (typeof options.mask == 'undefined') options.mask = !this._isServer;
	  startQueue(this);
	  var send = function(data, final) {
	    try {
	      if (self.readyState != WebSocket.OPEN) throw new Error('not opened');
	      options.fin = final === true;
	      self._sender.send(data, options);
	      if (!final) process.nextTick(cb.bind(null, null, send));
	      else executeQueueSends(self);
	    }
	    catch (e) {
	      if (typeof cb == 'function') cb(e);
	      else {
	        delete self._queue;
	        self.emit('error', e);
	      }
	    }
	  }
	  process.nextTick(cb.bind(null, null, send));
	}

	/**
	 * Immediately shuts down the connection
	 *
	 * @api public
	 */

	WebSocket.prototype.terminate = function() {
	  if (this.readyState == WebSocket.CLOSED) return;
	  if (this._socket) {
	    try {
	      // End the connection
	      this._socket.end();
	    }
	    catch (e) {
	      // Socket error during end() call, so just destroy it right now
	      cleanupWebsocketResources.call(this, true);
	      return;
	    }

	    // Add a timeout to ensure that the connection is completely
	    // cleaned up within 30 seconds, even if the clean close procedure
	    // fails for whatever reason
	    this._closeTimer = setTimeout(cleanupWebsocketResources.bind(this, true), closeTimeout);
	  }
	  else if (this.readyState == WebSocket.CONNECTING) {
	    cleanupWebsocketResources.call(this, true);
	  }
	};

	/**
	 * Expose bufferedAmount
	 *
	 * @api public
	 */

	Object.defineProperty(WebSocket.prototype, 'bufferedAmount', {
	  get: function get() {
	    var amount = 0;
	    if (this._socket) {
	      amount = this._socket.bufferSize || 0;
	    }
	    return amount;
	  }
	});

	/**
	 * Emulates the W3C Browser based WebSocket interface using function members.
	 *
	 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
	 * @api public
	 */

	['open', 'error', 'close', 'message'].forEach(function(method) {
	  Object.defineProperty(WebSocket.prototype, 'on' + method, {
	    /**
	     * Returns the current listener
	     *
	     * @returns {Mixed} the set function or undefined
	     * @api public
	     */

	    get: function get() {
	      var listener = this.listeners(method)[0];
	      return listener ? (listener._listener ? listener._listener : listener) : undefined;
	    },

	    /**
	     * Start listening for events
	     *
	     * @param {Function} listener the listener
	     * @returns {Mixed} the set function or undefined
	     * @api public
	     */

	    set: function set(listener) {
	      this.removeAllListeners(method);
	      this.addEventListener(method, listener);
	    }
	  });
	});

	/**
	 * Emulates the W3C Browser based WebSocket interface using addEventListener.
	 *
	 * @see https://developer.mozilla.org/en/DOM/element.addEventListener
	 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
	 * @api public
	 */
	WebSocket.prototype.addEventListener = function(method, listener) {
	  var target = this;
	  if (typeof listener === 'function') {
	    if (method === 'message') {
	      function onMessage (data, flags) {
	        listener.call(this, new MessageEvent(data, flags.binary ? 'Binary' : 'Text', target));
	      }
	      // store a reference so we can return the original function from the addEventListener hook
	      onMessage._listener = listener;
	      this.on(method, onMessage);
	    } else if (method === 'close') {
	      function onClose (code, message) {
	        listener.call(this, new CloseEvent(code, message, target));
	      }
	      // store a reference so we can return the original function from the addEventListener hook
	      onClose._listener = listener;
	      this.on(method, onClose);
	    } else if (method === 'error') {
	      function onError (event) {
	        event.target = target;
	        listener.call(this, event);
	      }
	      // store a reference so we can return the original function from the addEventListener hook
	      onError._listener = listener;
	      this.on(method, onError);
	    } else if (method === 'open') {
	      function onOpen () {
	        listener.call(this, new OpenEvent(target));
	      }
	      // store a reference so we can return the original function from the addEventListener hook
	      onOpen._listener = listener;
	      this.on(method, onOpen);
	    } else {
	      this.on(method, listener);
	    }
	  }
	}

	module.exports = WebSocket;

	/**
	 * W3C MessageEvent
	 *
	 * @see http://www.w3.org/TR/html5/comms.html
	 * @api private
	 */

	function MessageEvent(dataArg, typeArg, target) {
	  this.data = dataArg;
	  this.type = typeArg;
	  this.target = target;
	}

	/**
	 * W3C CloseEvent
	 *
	 * @see http://www.w3.org/TR/html5/comms.html
	 * @api private
	 */

	function CloseEvent(code, reason, target) {
	  this.wasClean = (typeof code == 'undefined' || code == 1000);
	  this.code = code;
	  this.reason = reason;
	  this.target = target;
	}

	/**
	 * W3C OpenEvent
	 *
	 * @see http://www.w3.org/TR/html5/comms.html
	 * @api private
	 */

	function OpenEvent(target) {
	  this.target = target;
	}

	/**
	 * Entirely private apis,
	 * which may or may not be bound to a sepcific WebSocket instance.
	 */

	function initAsServerClient(req, socket, upgradeHead, options) {
	  options = new Options({
	    protocolVersion: protocolVersion,
	    protocol: null
	  }).merge(options);

	  // expose state properties
	  this.protocol = options.value.protocol;
	  this.protocolVersion = options.value.protocolVersion;
	  this.supports.binary = (this.protocolVersion != 'hixie-76');
	  this.upgradeReq = req;
	  this.readyState = WebSocket.CONNECTING;
	  this._isServer = true;

	  // establish connection
	  if (options.value.protocolVersion == 'hixie-76') establishConnection.call(this, ReceiverHixie, SenderHixie, socket, upgradeHead);
	  else establishConnection.call(this, Receiver, Sender, socket, upgradeHead);
	}

	function initAsClient(address, protocols, options) {
	  options = new Options({
	    origin: null,
	    protocolVersion: protocolVersion,
	    host: null,
	    headers: null,
	    protocol: null,
	    agent: null,

	    // ssl-related options
	    pfx: null,
	    key: null,
	    passphrase: null,
	    cert: null,
	    ca: null,
	    ciphers: null,
	    rejectUnauthorized: null
	  }).merge(options);
	  if (options.value.protocolVersion != 8 && options.value.protocolVersion != 13) {
	    throw new Error('unsupported protocol version');
	  }

	  // verify url and establish http class
	  var serverUrl = url.parse(address);
	  var isUnixSocket = serverUrl.protocol === 'ws+unix:';
	  if (!serverUrl.host && !isUnixSocket) throw new Error('invalid url');
	  var isSecure = serverUrl.protocol === 'wss:' || serverUrl.protocol === 'https:';
	  var httpObj = isSecure ? https : http;
	  var port = serverUrl.port || (isSecure ? 443 : 80);
	  var auth = serverUrl.auth;

	  // expose state properties
	  this._isServer = false;
	  this.url = address;
	  this.protocolVersion = options.value.protocolVersion;
	  this.supports.binary = (this.protocolVersion != 'hixie-76');

	  // begin handshake
	  var key = new Buffer(options.value.protocolVersion + '-' + Date.now()).toString('base64');
	  var shasum = crypto.createHash('sha1');
	  shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
	  var expectedServerKey = shasum.digest('base64');

	  var agent = options.value.agent;

	  var headerHost = serverUrl.hostname;
	  // Append port number to Host and Origin header, only if specified in the url and non-default
	  if(serverUrl.port) {
	    if((isSecure && (port != 443)) || (!isSecure && (port != 80))){
	      headerHost = headerHost + ':' + port;
	    }
	  }

	  var requestOptions = {
	    port: port,
	    host: serverUrl.hostname,
	    headers: {
	      'Connection': 'Upgrade',
	      'Upgrade': 'websocket',
	      'Host': headerHost,
	      'Origin': headerHost,
	      'Sec-WebSocket-Version': options.value.protocolVersion,
	      'Sec-WebSocket-Key': key
	    }
	  };

	  // If we have basic auth.
	  if (auth) {
	    requestOptions.headers['Authorization'] = 'Basic ' + new Buffer(auth).toString('base64');
	  }

	  if (options.value.protocol) {
	    requestOptions.headers['Sec-WebSocket-Protocol'] = options.value.protocol;
	  }

	  if (options.value.host) {
	    requestOptions.headers['Host'] = options.value.host;
	  }

	  if (options.value.headers) {
	    for (var header in options.value.headers) {
	       if (options.value.headers.hasOwnProperty(header)) {
	        requestOptions.headers[header] = options.value.headers[header];
	       }
	    }
	  }

	  if (options.isDefinedAndNonNull('pfx')
	   || options.isDefinedAndNonNull('key')
	   || options.isDefinedAndNonNull('passphrase')
	   || options.isDefinedAndNonNull('cert')
	   || options.isDefinedAndNonNull('ca')
	   || options.isDefinedAndNonNull('ciphers')
	   || options.isDefinedAndNonNull('rejectUnauthorized')) {

	    if (options.isDefinedAndNonNull('pfx')) requestOptions.pfx = options.value.pfx;
	    if (options.isDefinedAndNonNull('key')) requestOptions.key = options.value.key;
	    if (options.isDefinedAndNonNull('passphrase')) requestOptions.passphrase = options.value.passphrase;
	    if (options.isDefinedAndNonNull('cert')) requestOptions.cert = options.value.cert;
	    if (options.isDefinedAndNonNull('ca')) requestOptions.ca = options.value.ca;
	    if (options.isDefinedAndNonNull('ciphers')) requestOptions.ciphers = options.value.ciphers;
	    if (options.isDefinedAndNonNull('rejectUnauthorized')) requestOptions.rejectUnauthorized = options.value.rejectUnauthorized;

	    if (!agent) {
	        // global agent ignores client side certificates
	        agent = new httpObj.Agent(requestOptions);
	    }
	  }

	  requestOptions.path = serverUrl.path || '/';

	  if (agent) {
	    requestOptions.agent = agent;
	  }

	  if (isUnixSocket) {
	    requestOptions.socketPath = serverUrl.pathname;
	  }
	  if (options.value.origin) {
	    if (options.value.protocolVersion < 13) requestOptions.headers['Sec-WebSocket-Origin'] = options.value.origin;
	    else requestOptions.headers['Origin'] = options.value.origin;
	  }

	  var self = this;
	  var req = httpObj.request(requestOptions);

	  req.on('error', function(error) {
	    self.emit('error', error);
	    cleanupWebsocketResources.call(this, error);
	  });

	  req.once('response', function(res) {
	    if (!self.emit('unexpected-response', req, res)) {
	      var error = new Error('unexpected server response (' + res.statusCode + ')');
	      req.abort();
	      self.emit('error', error);
	    }
	    cleanupWebsocketResources.call(this, error);
	  });

	  req.once('upgrade', function(res, socket, upgradeHead) {
	    if (self.readyState == WebSocket.CLOSED) {
	      // client closed before server accepted connection
	      self.emit('close');
	      self.removeAllListeners();
	      socket.end();
	      return;
	    }
	    var serverKey = res.headers['sec-websocket-accept'];
	    if (typeof serverKey == 'undefined' || serverKey !== expectedServerKey) {
	      self.emit('error', 'invalid server key');
	      self.removeAllListeners();
	      socket.end();
	      return;
	    }

	    var serverProt = res.headers['sec-websocket-protocol'];
	    var protList = (options.value.protocol || "").split(/, */);
	    var protError = null;
	    if (!options.value.protocol && serverProt) {
	        protError = 'server sent a subprotocol even though none requested';
	    } else if (options.value.protocol && !serverProt) {
	        protError = 'server sent no subprotocol even though requested';
	    } else if (serverProt && protList.indexOf(serverProt) === -1) {
	        protError = 'server responded with an invalid protocol';
	    }
	    if (protError) {
	        self.emit('error', protError);
	        self.removeAllListeners();
	        socket.end();
	        return;
	    } else if (serverProt) {
	        self.protocol = serverProt;
	    }

	    establishConnection.call(self, Receiver, Sender, socket, upgradeHead);

	    // perform cleanup on http resources
	    req.removeAllListeners();
	    req = null;
	    agent = null;
	  });

	  req.end();
	  this.readyState = WebSocket.CONNECTING;
	}

	function establishConnection(ReceiverClass, SenderClass, socket, upgradeHead) {
	  this._socket = socket;
	  socket.setTimeout(0);
	  socket.setNoDelay(true);
	  var self = this;
	  this._receiver = new ReceiverClass();

	  // socket cleanup handlers
	  socket.on('end', cleanupWebsocketResources.bind(this));
	  socket.on('close', cleanupWebsocketResources.bind(this));
	  socket.on('error', cleanupWebsocketResources.bind(this));

	  // ensure that the upgradeHead is added to the receiver
	  function firstHandler(data) {
	    if (self.readyState != WebSocket.OPEN) return;
	    if (upgradeHead && upgradeHead.length > 0) {
	      self.bytesReceived += upgradeHead.length;
	      var head = upgradeHead;
	      upgradeHead = null;
	      self._receiver.add(head);
	    }
	    dataHandler = realHandler;
	    if (data) {
	      self.bytesReceived += data.length;
	      self._receiver.add(data);
	    }
	  }
	  // subsequent packets are pushed straight to the receiver
	  function realHandler(data) {
	    if (data) self.bytesReceived += data.length;
	    self._receiver.add(data);
	  }
	  var dataHandler = firstHandler;
	  // if data was passed along with the http upgrade,
	  // this will schedule a push of that on to the receiver.
	  // this has to be done on next tick, since the caller
	  // hasn't had a chance to set event handlers on this client
	  // object yet.
	  process.nextTick(firstHandler);

	  // receiver event handlers
	  self._receiver.ontext = function (data, flags) {
	    flags = flags || {};
	    self.emit('message', data, flags);
	  };
	  self._receiver.onbinary = function (data, flags) {
	    flags = flags || {};
	    flags.binary = true;
	    self.emit('message', data, flags);
	  };
	  self._receiver.onping = function(data, flags) {
	    flags = flags || {};
	    self.pong(data, {mask: !self._isServer, binary: flags.binary === true}, true);
	    self.emit('ping', data, flags);
	  };
	  self._receiver.onpong = function(data, flags) {
	    self.emit('pong', data, flags);
	  };
	  self._receiver.onclose = function(code, data, flags) {
	    flags = flags || {};
	    self.close(code, data);
	  };
	  self._receiver.onerror = function(reason, errorCode) {
	    // close the connection when the receiver reports a HyBi error code
	    self.close(typeof errorCode != 'undefined' ? errorCode : 1002, '');
	    self.emit('error', reason, errorCode);
	  };

	  // finalize the client
	  this._sender = new SenderClass(socket);
	  this._sender.on('error', function(error) {
	    self.close(1002, '');
	    self.emit('error', error);
	  });
	  this.readyState = WebSocket.OPEN;
	  this.emit('open');

	  socket.on('data', dataHandler);
	}

	function startQueue(instance) {
	  instance._queue = instance._queue || [];
	}

	function executeQueueSends(instance) {
	  var queue = instance._queue;
	  if (typeof queue == 'undefined') return;
	  delete instance._queue;
	  for (var i = 0, l = queue.length; i < l; ++i) {
	    queue[i]();
	  }
	}

	function sendStream(instance, stream, options, cb) {
	  stream.on('data', function(data) {
	    if (instance.readyState != WebSocket.OPEN) {
	      if (typeof cb == 'function') cb(new Error('not opened'));
	      else {
	        delete instance._queue;
	        instance.emit('error', new Error('not opened'));
	      }
	      return;
	    }
	    options.fin = false;
	    instance._sender.send(data, options);
	  });
	  stream.on('end', function() {
	    if (instance.readyState != WebSocket.OPEN) {
	      if (typeof cb == 'function') cb(new Error('not opened'));
	      else {
	        delete instance._queue;
	        instance.emit('error', new Error('not opened'));
	      }
	      return;
	    }
	    options.fin = true;
	    instance._sender.send(null, options);
	    if (typeof cb == 'function') cb(null);
	  });
	}

	function cleanupWebsocketResources(error) {
	  if (this.readyState == WebSocket.CLOSED) return;
	  var emitClose = this.readyState != WebSocket.CONNECTING;
	  this.readyState = WebSocket.CLOSED;

	  clearTimeout(this._closeTimer);
	  this._closeTimer = null;
	  if (emitClose) this.emit('close', this._closeCode || 1000, this._closeMessage || '');

	  if (this._socket) {
	    this._socket.removeAllListeners();
	    // catch all socket error after removing all standard handlers
	    var socket = this._socket;
	    this._socket.on('error', function() {
	      try { socket.destroy(); } catch (e) {}
	    });
	    try {
	      if (!error) this._socket.end();
	      else this._socket.destroy();
	    }
	    catch (e) { /* Ignore termination errors */ }
	    this._socket = null;
	  }
	  if (this._sender) {
	    this._sender.removeAllListeners();
	    this._sender = null;
	  }
	  if (this._receiver) {
	    this._receiver.cleanup();
	    this._receiver = null;
	  }
	  this.removeAllListeners();
	  this.on('error', function() {}); // catch all errors after this
	  delete this._queue;
	}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	module.exports = require("crypto");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = require("url");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = require("stream");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var fs = __webpack_require__(26);

	function Options(defaults) {
	  var internalValues = {};
	  var values = this.value = {};
	  Object.keys(defaults).forEach(function(key) {
	    internalValues[key] = defaults[key];
	    Object.defineProperty(values, key, {
	      get: function() { return internalValues[key]; },
	      configurable: false,
	      enumerable: true
	    });
	  });
	  this.reset = function() {
	    Object.keys(defaults).forEach(function(key) {
	      internalValues[key] = defaults[key];
	    });
	    return this;
	  };
	  this.merge = function(options, required) {
	    options = options || {};
	    if (Object.prototype.toString.call(required) === '[object Array]') {
	      var missing = [];
	      for (var i = 0, l = required.length; i < l; ++i) {
	        var key = required[i];
	        if (!(key in options)) {
	          missing.push(key);
	        }
	      }
	      if (missing.length > 0) {
	        if (missing.length > 1) {
	          throw new Error('options ' +
	            missing.slice(0, missing.length - 1).join(', ') + ' and ' +
	            missing[missing.length - 1] + ' must be defined');
	        }
	        else throw new Error('option ' + missing[0] + ' must be defined');
	      }
	    }
	    Object.keys(options).forEach(function(key) {
	      if (key in internalValues) {
	        internalValues[key] = options[key];
	      }
	    });
	    return this;
	  };
	  this.copy = function(keys) {
	    var obj = {};
	    Object.keys(defaults).forEach(function(key) {
	      if (keys.indexOf(key) !== -1) {
	        obj[key] = values[key];
	      }
	    });
	    return obj;
	  };
	  this.read = function(filename, cb) {
	    if (typeof cb == 'function') {
	      var self = this;
	      fs.readFile(filename, function(error, data) {
	        if (error) return cb(error);
	        var conf = JSON.parse(data);
	        self.merge(conf);
	        cb();
	      });
	    }
	    else {
	      var conf = JSON.parse(fs.readFileSync(filename));
	      this.merge(conf);
	    }
	    return this;
	  };
	  this.isDefined = function(key) {
	    return typeof values[key] != 'undefined';
	  };
	  this.isDefinedAndNonNull = function(key) {
	    return typeof values[key] != 'undefined' && values[key] !== null;
	  };
	  Object.freeze(values);
	  Object.freeze(this);
	}

	module.exports = Options;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var events = __webpack_require__(5)
	  , util = __webpack_require__(3)
	  , EventEmitter = events.EventEmitter
	  , ErrorCodes = __webpack_require__(28)
	  , bufferUtil = __webpack_require__(29).BufferUtil;

	/**
	 * HyBi Sender implementation
	 */

	function Sender(socket) {
	  this._socket = socket;
	  this.firstFragment = true;
	}

	/**
	 * Inherits from EventEmitter.
	 */

	util.inherits(Sender, events.EventEmitter);

	/**
	 * Sends a close instruction to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.close = function(code, data, mask) {
	  if (typeof code !== 'undefined') {
	    if (typeof code !== 'number' ||
	      !ErrorCodes.isValidErrorCode(code)) throw new Error('first argument must be a valid error code number');
	  }
	  code = code || 1000;
	  var dataBuffer = new Buffer(2 + (data ? Buffer.byteLength(data) : 0));
	  writeUInt16BE.call(dataBuffer, code, 0);
	  if (dataBuffer.length > 2) dataBuffer.write(data, 2);
	  this.frameAndSend(0x8, dataBuffer, true, mask);
	};

	/**
	 * Sends a ping message to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.ping = function(data, options) {
	  var mask = options && options.mask;
	  this.frameAndSend(0x9, data || '', true, mask);
	};

	/**
	 * Sends a pong message to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.pong = function(data, options) {
	  var mask = options && options.mask;
	  this.frameAndSend(0xa, data || '', true, mask);
	};

	/**
	 * Sends text or binary data to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.send = function(data, options, cb) {
	  var finalFragment = options && options.fin === false ? false : true;
	  var mask = options && options.mask;
	  var opcode = options && options.binary ? 2 : 1;
	  if (this.firstFragment === false) opcode = 0;
	  else this.firstFragment = false;
	  if (finalFragment) this.firstFragment = true
	  this.frameAndSend(opcode, data, finalFragment, mask, cb);
	};

	/**
	 * Frames and sends a piece of data according to the HyBi WebSocket protocol.
	 *
	 * @api private
	 */

	Sender.prototype.frameAndSend = function(opcode, data, finalFragment, maskData, cb) {
	  var canModifyData = false;

	  if (!data) {
	    try {
	      this._socket.write(new Buffer([opcode | (finalFragment ? 0x80 : 0), 0 | (maskData ? 0x80 : 0)].concat(maskData ? [0, 0, 0, 0] : [])), 'binary', cb);
	    }
	    catch (e) {
	      if (typeof cb == 'function') cb(e);
	      else this.emit('error', e);
	    }
	    return;
	  }

	  if (!Buffer.isBuffer(data)) {
	    canModifyData = true;
	    if (data && (typeof data.byteLength !== 'undefined' || typeof data.buffer !== 'undefined')) {
	      data = getArrayBuffer(data);
	    } else {
	      data = new Buffer(data);
	    }
	  }

	  var dataLength = data.length
	    , dataOffset = maskData ? 6 : 2
	    , secondByte = dataLength;

	  if (dataLength >= 65536) {
	    dataOffset += 8;
	    secondByte = 127;
	  }
	  else if (dataLength > 125) {
	    dataOffset += 2;
	    secondByte = 126;
	  }

	  var mergeBuffers = dataLength < 32768 || (maskData && !canModifyData);
	  var totalLength = mergeBuffers ? dataLength + dataOffset : dataOffset;
	  var outputBuffer = new Buffer(totalLength);
	  outputBuffer[0] = finalFragment ? opcode | 0x80 : opcode;

	  switch (secondByte) {
	    case 126:
	      writeUInt16BE.call(outputBuffer, dataLength, 2);
	      break;
	    case 127:
	      writeUInt32BE.call(outputBuffer, 0, 2);
	      writeUInt32BE.call(outputBuffer, dataLength, 6);
	  }

	  if (maskData) {
	    outputBuffer[1] = secondByte | 0x80;
	    var mask = this._randomMask || (this._randomMask = getRandomMask());
	    outputBuffer[dataOffset - 4] = mask[0];
	    outputBuffer[dataOffset - 3] = mask[1];
	    outputBuffer[dataOffset - 2] = mask[2];
	    outputBuffer[dataOffset - 1] = mask[3];
	    if (mergeBuffers) {
	      bufferUtil.mask(data, mask, outputBuffer, dataOffset, dataLength);
	      try {
	        this._socket.write(outputBuffer, 'binary', cb);
	      }
	      catch (e) {
	        if (typeof cb == 'function') cb(e);
	        else this.emit('error', e);
	      }
	    }
	    else {
	      bufferUtil.mask(data, mask, data, 0, dataLength);
	      try {
	        this._socket.write(outputBuffer, 'binary');
	        this._socket.write(data, 'binary', cb);
	      }
	      catch (e) {
	        if (typeof cb == 'function') cb(e);
	        else this.emit('error', e);
	      }
	    }
	  }
	  else {
	    outputBuffer[1] = secondByte;
	    if (mergeBuffers) {
	      data.copy(outputBuffer, dataOffset);
	      try {
	        this._socket.write(outputBuffer, 'binary', cb);
	      }
	      catch (e) {
	        if (typeof cb == 'function') cb(e);
	        else this.emit('error', e);
	      }
	    }
	    else {
	      try {
	        this._socket.write(outputBuffer, 'binary');
	        this._socket.write(data, 'binary', cb);
	      }
	      catch (e) {
	        if (typeof cb == 'function') cb(e);
	        else this.emit('error', e);
	      }
	    }
	  }
	};

	module.exports = Sender;

	function writeUInt16BE(value, offset) {
	  this[offset] = (value & 0xff00)>>8;
	  this[offset+1] = value & 0xff;
	}

	function writeUInt32BE(value, offset) {
	  this[offset] = (value & 0xff000000)>>24;
	  this[offset+1] = (value & 0xff0000)>>16;
	  this[offset+2] = (value & 0xff00)>>8;
	  this[offset+3] = value & 0xff;
	}

	function getArrayBuffer(data) {
	  // data is either an ArrayBuffer or ArrayBufferView.
	  var array = new Uint8Array(data.buffer || data)
	    , l = data.byteLength || data.length
	    , o = data.byteOffset || 0
	    , buffer = new Buffer(l);
	  for (var i = 0; i < l; ++i) {
	    buffer[i] = array[o+i];
	  }
	  return buffer;
	}

	function getRandomMask() {
	  return new Buffer([
	    ~~(Math.random() * 255),
	    ~~(Math.random() * 255),
	    ~~(Math.random() * 255),
	    ~~(Math.random() * 255)
	  ]);
	}


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	module.exports = {
	  isValidErrorCode: function(code) {
	    return (code >= 1000 && code <= 1011 && code != 1004 && code != 1005 && code != 1006) ||
	         (code >= 3000 && code <= 4999);
	  },
	  1000: 'normal',
	  1001: 'going away',
	  1002: 'protocol error',
	  1003: 'unsupported data',
	  1004: 'reserved',
	  1005: 'reserved for extensions',
	  1006: 'reserved for extensions',
	  1007: 'inconsistent or invalid data',
	  1008: 'policy violation',
	  1009: 'message too big',
	  1010: 'extension handshake missing',
	  1011: 'an unexpected condition prevented the request from being fulfilled',
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	try {
	  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/Release/bufferutil\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	} catch (e) { try {
	  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/default/bufferutil\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	} catch (e) { try {
	  module.exports = __webpack_require__(30);
	} catch (e) {
	  console.error('bufferutil.node seems to not have been built. Run npm install.');
	  throw e;
	}}}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	module.exports.BufferUtil = {
	  merge: function(mergedBuffer, buffers) {
	    var offset = 0;
	    for (var i = 0, l = buffers.length; i < l; ++i) {
	      var buf = buffers[i];
	      buf.copy(mergedBuffer, offset);
	      offset += buf.length;
	    }
	  },
	  mask: function(source, mask, output, offset, length) {
	    var maskNum = mask.readUInt32LE(0, true);
	    var i = 0;
	    for (; i < length - 3; i += 4) {
	      var num = maskNum ^ source.readUInt32LE(i, true);
	      if (num < 0) num = 4294967296 + num;
	      output.writeUInt32LE(num, offset + i, true);
	    }
	    switch (length % 4) {
	      case 3: output[offset + i + 2] = source[i + 2] ^ mask[2];
	      case 2: output[offset + i + 1] = source[i + 1] ^ mask[1];
	      case 1: output[offset + i] = source[i] ^ mask[0];
	      case 0:;
	    }
	  },
	  unmask: function(data, mask) {
	    var maskNum = mask.readUInt32LE(0, true);
	    var length = data.length;
	    var i = 0;
	    for (; i < length - 3; i += 4) {
	      var num = maskNum ^ data.readUInt32LE(i, true);
	      if (num < 0) num = 4294967296 + num;
	      data.writeUInt32LE(num, i, true);
	    }
	    switch (length % 4) {
	      case 3: data[i + 2] = data[i + 2] ^ mask[2];
	      case 2: data[i + 1] = data[i + 1] ^ mask[1];
	      case 1: data[i] = data[i] ^ mask[0];
	      case 0:;
	    }
	  }
	}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(3)
	  , Validation = __webpack_require__(32).Validation
	  , ErrorCodes = __webpack_require__(28)
	  , BufferPool = __webpack_require__(34)
	  , bufferUtil = __webpack_require__(29).BufferUtil;

	/**
	 * HyBi Receiver implementation
	 */

	function Receiver () {
	  // memory pool for fragmented messages
	  var fragmentedPoolPrevUsed = -1;
	  this.fragmentedBufferPool = new BufferPool(1024, function(db, length) {
	    return db.used + length;
	  }, function(db) {
	    return fragmentedPoolPrevUsed = fragmentedPoolPrevUsed >= 0 ?
	      (fragmentedPoolPrevUsed + db.used) / 2 :
	      db.used;
	  });

	  // memory pool for unfragmented messages
	  var unfragmentedPoolPrevUsed = -1;
	  this.unfragmentedBufferPool = new BufferPool(1024, function(db, length) {
	    return db.used + length;
	  }, function(db) {
	    return unfragmentedPoolPrevUsed = unfragmentedPoolPrevUsed >= 0 ?
	      (unfragmentedPoolPrevUsed + db.used) / 2 :
	      db.used;
	  });

	  this.state = {
	    activeFragmentedOperation: null,
	    lastFragment: false,
	    masked: false,
	    opcode: 0,
	    fragmentedOperation: false
	  };
	  this.overflow = [];
	  this.headerBuffer = new Buffer(10);
	  this.expectOffset = 0;
	  this.expectBuffer = null;
	  this.expectHandler = null;
	  this.currentMessage = [];
	  this.expectHeader(2, this.processPacket);
	  this.dead = false;

	  this.onerror = function() {};
	  this.ontext = function() {};
	  this.onbinary = function() {};
	  this.onclose = function() {};
	  this.onping = function() {};
	  this.onpong = function() {};
	}

	module.exports = Receiver;

	/**
	 * Add new data to the parser.
	 *
	 * @api public
	 */

	Receiver.prototype.add = function(data) {
	  var dataLength = data.length;
	  if (dataLength == 0) return;
	  if (this.expectBuffer == null) {
	    this.overflow.push(data);
	    return;
	  }
	  var toRead = Math.min(dataLength, this.expectBuffer.length - this.expectOffset);
	  fastCopy(toRead, data, this.expectBuffer, this.expectOffset);
	  this.expectOffset += toRead;
	  if (toRead < dataLength) {
	    this.overflow.push(data.slice(toRead));
	  }
	  while (this.expectBuffer && this.expectOffset == this.expectBuffer.length) {
	    var bufferForHandler = this.expectBuffer;
	    this.expectBuffer = null;
	    this.expectOffset = 0;
	    this.expectHandler.call(this, bufferForHandler);
	  }
	};

	/**
	 * Releases all resources used by the receiver.
	 *
	 * @api public
	 */

	Receiver.prototype.cleanup = function() {
	  this.dead = true;
	  this.overflow = null;
	  this.headerBuffer = null;
	  this.expectBuffer = null;
	  this.expectHandler = null;
	  this.unfragmentedBufferPool = null;
	  this.fragmentedBufferPool = null;
	  this.state = null;
	  this.currentMessage = null;
	  this.onerror = null;
	  this.ontext = null;
	  this.onbinary = null;
	  this.onclose = null;
	  this.onping = null;
	  this.onpong = null;
	};

	/**
	 * Waits for a certain amount of header bytes to be available, then fires a callback.
	 *
	 * @api private
	 */

	Receiver.prototype.expectHeader = function(length, handler) {
	  if (length == 0) {
	    handler(null);
	    return;
	  }
	  this.expectBuffer = this.headerBuffer.slice(this.expectOffset, this.expectOffset + length);
	  this.expectHandler = handler;
	  var toRead = length;
	  while (toRead > 0 && this.overflow.length > 0) {
	    var fromOverflow = this.overflow.pop();
	    if (toRead < fromOverflow.length) this.overflow.push(fromOverflow.slice(toRead));
	    var read = Math.min(fromOverflow.length, toRead);
	    fastCopy(read, fromOverflow, this.expectBuffer, this.expectOffset);
	    this.expectOffset += read;
	    toRead -= read;
	  }
	};

	/**
	 * Waits for a certain amount of data bytes to be available, then fires a callback.
	 *
	 * @api private
	 */

	Receiver.prototype.expectData = function(length, handler) {
	  if (length == 0) {
	    handler(null);
	    return;
	  }
	  this.expectBuffer = this.allocateFromPool(length, this.state.fragmentedOperation);
	  this.expectHandler = handler;
	  var toRead = length;
	  while (toRead > 0 && this.overflow.length > 0) {
	    var fromOverflow = this.overflow.pop();
	    if (toRead < fromOverflow.length) this.overflow.push(fromOverflow.slice(toRead));
	    var read = Math.min(fromOverflow.length, toRead);
	    fastCopy(read, fromOverflow, this.expectBuffer, this.expectOffset);
	    this.expectOffset += read;
	    toRead -= read;
	  }
	};

	/**
	 * Allocates memory from the buffer pool.
	 *
	 * @api private
	 */

	Receiver.prototype.allocateFromPool = function(length, isFragmented) {
	  return (isFragmented ? this.fragmentedBufferPool : this.unfragmentedBufferPool).get(length);
	};

	/**
	 * Start processing a new packet.
	 *
	 * @api private
	 */

	Receiver.prototype.processPacket = function (data) {
	  if ((data[0] & 0x70) != 0) {
	    this.error('reserved fields must be empty', 1002);
	    return;
	  }
	  this.state.lastFragment = (data[0] & 0x80) == 0x80;
	  this.state.masked = (data[1] & 0x80) == 0x80;
	  var opcode = data[0] & 0xf;
	  if (opcode === 0) {
	    // continuation frame
	    this.state.fragmentedOperation = true;
	    this.state.opcode = this.state.activeFragmentedOperation;
	    if (!(this.state.opcode == 1 || this.state.opcode == 2)) {
	      this.error('continuation frame cannot follow current opcode', 1002);
	      return;
	    }
	  }
	  else {
	    if (opcode < 3 && this.state.activeFragmentedOperation != null) {
	      this.error('data frames after the initial data frame must have opcode 0', 1002);
	      return;
	    }
	    this.state.opcode = opcode;
	    if (this.state.lastFragment === false) {
	      this.state.fragmentedOperation = true;
	      this.state.activeFragmentedOperation = opcode;
	    }
	    else this.state.fragmentedOperation = false;
	  }
	  var handler = opcodes[this.state.opcode];
	  if (typeof handler == 'undefined') this.error('no handler for opcode ' + this.state.opcode, 1002);
	  else {
	    handler.start.call(this, data);
	  }
	};

	/**
	 * Endprocessing a packet.
	 *
	 * @api private
	 */

	Receiver.prototype.endPacket = function() {
	  if (!this.state.fragmentedOperation) this.unfragmentedBufferPool.reset(true);
	  else if (this.state.lastFragment) this.fragmentedBufferPool.reset(false);
	  this.expectOffset = 0;
	  this.expectBuffer = null;
	  this.expectHandler = null;
	  if (this.state.lastFragment && this.state.opcode === this.state.activeFragmentedOperation) {
	    // end current fragmented operation
	    this.state.activeFragmentedOperation = null;
	  }
	  this.state.lastFragment = false;
	  this.state.opcode = this.state.activeFragmentedOperation != null ? this.state.activeFragmentedOperation : 0;
	  this.state.masked = false;
	  this.expectHeader(2, this.processPacket);
	};

	/**
	 * Reset the parser state.
	 *
	 * @api private
	 */

	Receiver.prototype.reset = function() {
	  if (this.dead) return;
	  this.state = {
	    activeFragmentedOperation: null,
	    lastFragment: false,
	    masked: false,
	    opcode: 0,
	    fragmentedOperation: false
	  };
	  this.fragmentedBufferPool.reset(true);
	  this.unfragmentedBufferPool.reset(true);
	  this.expectOffset = 0;
	  this.expectBuffer = null;
	  this.expectHandler = null;
	  this.overflow = [];
	  this.currentMessage = [];
	};

	/**
	 * Unmask received data.
	 *
	 * @api private
	 */

	Receiver.prototype.unmask = function (mask, buf, binary) {
	  if (mask != null && buf != null) bufferUtil.unmask(buf, mask);
	  if (binary) return buf;
	  return buf != null ? buf.toString('utf8') : '';
	};

	/**
	 * Concatenates a list of buffers.
	 *
	 * @api private
	 */

	Receiver.prototype.concatBuffers = function(buffers) {
	  var length = 0;
	  for (var i = 0, l = buffers.length; i < l; ++i) length += buffers[i].length;
	  var mergedBuffer = new Buffer(length);
	  bufferUtil.merge(mergedBuffer, buffers);
	  return mergedBuffer;
	};

	/**
	 * Handles an error
	 *
	 * @api private
	 */

	Receiver.prototype.error = function (reason, protocolErrorCode) {
	  this.reset();
	  this.onerror(reason, protocolErrorCode);
	  return this;
	};

	/**
	 * Buffer utilities
	 */

	function readUInt16BE(start) {
	  return (this[start]<<8) +
	         this[start+1];
	}

	function readUInt32BE(start) {
	  return (this[start]<<24) +
	         (this[start+1]<<16) +
	         (this[start+2]<<8) +
	         this[start+3];
	}

	function fastCopy(length, srcBuffer, dstBuffer, dstOffset) {
	  switch (length) {
	    default: srcBuffer.copy(dstBuffer, dstOffset, 0, length); break;
	    case 16: dstBuffer[dstOffset+15] = srcBuffer[15];
	    case 15: dstBuffer[dstOffset+14] = srcBuffer[14];
	    case 14: dstBuffer[dstOffset+13] = srcBuffer[13];
	    case 13: dstBuffer[dstOffset+12] = srcBuffer[12];
	    case 12: dstBuffer[dstOffset+11] = srcBuffer[11];
	    case 11: dstBuffer[dstOffset+10] = srcBuffer[10];
	    case 10: dstBuffer[dstOffset+9] = srcBuffer[9];
	    case 9: dstBuffer[dstOffset+8] = srcBuffer[8];
	    case 8: dstBuffer[dstOffset+7] = srcBuffer[7];
	    case 7: dstBuffer[dstOffset+6] = srcBuffer[6];
	    case 6: dstBuffer[dstOffset+5] = srcBuffer[5];
	    case 5: dstBuffer[dstOffset+4] = srcBuffer[4];
	    case 4: dstBuffer[dstOffset+3] = srcBuffer[3];
	    case 3: dstBuffer[dstOffset+2] = srcBuffer[2];
	    case 2: dstBuffer[dstOffset+1] = srcBuffer[1];
	    case 1: dstBuffer[dstOffset] = srcBuffer[0];
	  }
	}

	/**
	 * Opcode handlers
	 */

	var opcodes = {
	  // text
	  '1': {
	    start: function(data) {
	      var self = this;
	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['1'].getData.call(self, firstLength);
	      }
	      else if (firstLength == 126) {
	        self.expectHeader(2, function(data) {
	          opcodes['1'].getData.call(self, readUInt16BE.call(data, 0));
	        });
	      }
	      else if (firstLength == 127) {
	        self.expectHeader(8, function(data) {
	          if (readUInt32BE.call(data, 0) != 0) {
	            self.error('packets with length spanning more than 32 bit is currently not supported', 1008);
	            return;
	          }
	          opcodes['1'].getData.call(self, readUInt32BE.call(data, 4));
	        });
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (self.state.masked) {
	        self.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['1'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        self.expectData(length, function(data) {
	          opcodes['1'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      var packet = this.unmask(mask, data, true);
	      if (packet != null) this.currentMessage.push(packet);
	      if (this.state.lastFragment) {
	        var messageBuffer = this.concatBuffers(this.currentMessage);
	        if (!Validation.isValidUTF8(messageBuffer)) {
	          this.error('invalid utf8 sequence', 1007);
	          return;
	        }
	        this.ontext(messageBuffer.toString('utf8'), {masked: this.state.masked, buffer: messageBuffer});
	        this.currentMessage = [];
	      }
	      this.endPacket();
	    }
	  },
	  // binary
	  '2': {
	    start: function(data) {
	      var self = this;
	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['2'].getData.call(self, firstLength);
	      }
	      else if (firstLength == 126) {
	        self.expectHeader(2, function(data) {
	          opcodes['2'].getData.call(self, readUInt16BE.call(data, 0));
	        });
	      }
	      else if (firstLength == 127) {
	        self.expectHeader(8, function(data) {
	          if (readUInt32BE.call(data, 0) != 0) {
	            self.error('packets with length spanning more than 32 bit is currently not supported', 1008);
	            return;
	          }
	          opcodes['2'].getData.call(self, readUInt32BE.call(data, 4, true));
	        });
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (self.state.masked) {
	        self.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['2'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        self.expectData(length, function(data) {
	          opcodes['2'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      var packet = this.unmask(mask, data, true);
	      if (packet != null) this.currentMessage.push(packet);
	      if (this.state.lastFragment) {
	        var messageBuffer = this.concatBuffers(this.currentMessage);
	        this.onbinary(messageBuffer, {masked: this.state.masked, buffer: messageBuffer});
	        this.currentMessage = [];
	      }
	      this.endPacket();
	    }
	  },
	  // close
	  '8': {
	    start: function(data) {
	      var self = this;
	      if (self.state.lastFragment == false) {
	        self.error('fragmented close is not supported', 1002);
	        return;
	      }

	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['8'].getData.call(self, firstLength);
	      }
	      else {
	        self.error('control frames cannot have more than 125 bytes of data', 1002);
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (self.state.masked) {
	        self.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['8'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        self.expectData(length, function(data) {
	          opcodes['8'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      var self = this;
	      data = self.unmask(mask, data, true);
	      if (data && data.length == 1) {
	        self.error('close packets with data must be at least two bytes long', 1002);
	        return;
	      }
	      var code = data && data.length > 1 ? readUInt16BE.call(data, 0) : 1000;
	      if (!ErrorCodes.isValidErrorCode(code)) {
	        self.error('invalid error code', 1002);
	        return;
	      }
	      var message = '';
	      if (data && data.length > 2) {
	        var messageBuffer = data.slice(2);
	        if (!Validation.isValidUTF8(messageBuffer)) {
	          self.error('invalid utf8 sequence', 1007);
	          return;
	        }
	        message = messageBuffer.toString('utf8');
	      }
	      this.onclose(code, message, {masked: self.state.masked});
	      this.reset();
	    },
	  },
	  // ping
	  '9': {
	    start: function(data) {
	      var self = this;
	      if (self.state.lastFragment == false) {
	        self.error('fragmented ping is not supported', 1002);
	        return;
	      }

	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['9'].getData.call(self, firstLength);
	      }
	      else {
	        self.error('control frames cannot have more than 125 bytes of data', 1002);
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (self.state.masked) {
	        self.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['9'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        self.expectData(length, function(data) {
	          opcodes['9'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      this.onping(this.unmask(mask, data, true), {masked: this.state.masked, binary: true});
	      this.endPacket();
	    }
	  },
	  // pong
	  '10': {
	    start: function(data) {
	      var self = this;
	      if (self.state.lastFragment == false) {
	        self.error('fragmented pong is not supported', 1002);
	        return;
	      }

	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['10'].getData.call(self, firstLength);
	      }
	      else {
	        self.error('control frames cannot have more than 125 bytes of data', 1002);
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (this.state.masked) {
	        this.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['10'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        this.expectData(length, function(data) {
	          opcodes['10'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      this.onpong(this.unmask(mask, data, true), {masked: this.state.masked, binary: true});
	      this.endPacket();
	    }
	  }
	}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	try {
	  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/Release/validation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	} catch (e) { try {
	  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/default/validation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	} catch (e) { try {
	  module.exports = __webpack_require__(33);
	} catch (e) {
	  console.error('validation.node seems to not have been built. Run npm install.');
	  throw e;
	}}}


/***/ }),
/* 33 */
/***/ (function(module, exports) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */
	 
	module.exports.Validation = {
	  isValidUTF8: function(buffer) {
	    return true;
	  }
	};



/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(3);

	function BufferPool(initialSize, growStrategy, shrinkStrategy) {
	  if (typeof initialSize === 'function') {
	    shrinkStrategy = growStrategy;
	    growStrategy = initialSize;
	    initialSize = 0;
	  }
	  else if (typeof initialSize === 'undefined') {
	    initialSize = 0;
	  }
	  this._growStrategy = (growStrategy || function(db, size) {
	    return db.used + size;
	  }).bind(null, this);
	  this._shrinkStrategy = (shrinkStrategy || function(db) {
	    return initialSize;
	  }).bind(null, this);
	  this._buffer = initialSize ? new Buffer(initialSize) : null;
	  this._offset = 0;
	  this._used = 0;
	  this._changeFactor = 0;
	  this.__defineGetter__('size', function(){
	    return this._buffer == null ? 0 : this._buffer.length;
	  });
	  this.__defineGetter__('used', function(){
	    return this._used;
	  });
	}

	BufferPool.prototype.get = function(length) {
	  if (this._buffer == null || this._offset + length > this._buffer.length) {
	    var newBuf = new Buffer(this._growStrategy(length));
	    this._buffer = newBuf;
	    this._offset = 0;
	  }
	  this._used += length;
	  var buf = this._buffer.slice(this._offset, this._offset + length);
	  this._offset += length;
	  return buf;
	}

	BufferPool.prototype.reset = function(forceNewBuffer) {
	  var len = this._shrinkStrategy();
	  if (len < this.size) this._changeFactor -= 1;
	  if (forceNewBuffer || this._changeFactor < -2) {
	    this._changeFactor = 0;
	    this._buffer = len ? new Buffer(len) : null;
	  }
	  this._offset = 0;
	  this._used = 0;
	}

	module.exports = BufferPool;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var events = __webpack_require__(5)
	  , util = __webpack_require__(3)
	  , EventEmitter = events.EventEmitter;

	/**
	 * Hixie Sender implementation
	 */

	function Sender(socket) {
	  this.socket = socket;
	  this.continuationFrame = false;
	  this.isClosed = false;
	}

	module.exports = Sender;

	/**
	 * Inherits from EventEmitter.
	 */

	util.inherits(Sender, events.EventEmitter);

	/**
	 * Frames and writes data.
	 *
	 * @api public
	 */

	Sender.prototype.send = function(data, options, cb) {
	  if (this.isClosed) return;

	  var isString = typeof data == 'string'
	    , length = isString ? Buffer.byteLength(data) : data.length
	    , lengthbytes = (length > 127) ? 2 : 1 // assume less than 2**14 bytes
	    , writeStartMarker = this.continuationFrame == false
	    , writeEndMarker = !options || !(typeof options.fin != 'undefined' && !options.fin)
	    , buffer = new Buffer((writeStartMarker ? ((options && options.binary) ? (1 + lengthbytes) : 1) : 0) + length + ((writeEndMarker && !(options && options.binary)) ? 1 : 0))
	    , offset = writeStartMarker ? 1 : 0;

	  if (writeStartMarker) {
	    if (options && options.binary) {
	      buffer.write('\x80', 'binary');
	      // assume length less than 2**14 bytes
	      if (lengthbytes > 1)
	        buffer.write(String.fromCharCode(128+length/128), offset++, 'binary');
	      buffer.write(String.fromCharCode(length&0x7f), offset++, 'binary');
	    } else
	      buffer.write('\x00', 'binary');
	  }

	  if (isString) buffer.write(data, offset, 'utf8');
	  else data.copy(buffer, offset, 0);

	  if (writeEndMarker) {
	    if (options && options.binary) {
	      // sending binary, not writing end marker
	    } else
	      buffer.write('\xff', offset + length, 'binary');
	    this.continuationFrame = false;
	  }
	  else this.continuationFrame = true;

	  try {
	    this.socket.write(buffer, 'binary', cb);
	  } catch (e) {
	    this.error(e.toString());
	  }
	};

	/**
	 * Sends a close instruction to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.close = function(code, data, mask, cb) {
	  if (this.isClosed) return;
	  this.isClosed = true;
	  try {
	    if (this.continuationFrame) this.socket.write(new Buffer([0xff], 'binary'));
	    this.socket.write(new Buffer([0xff, 0x00]), 'binary', cb);
	  } catch (e) {
	    this.error(e.toString());
	  }
	};

	/**
	 * Sends a ping message to the remote party. Not available for hixie.
	 *
	 * @api public
	 */

	Sender.prototype.ping = function(data, options) {};

	/**
	 * Sends a pong message to the remote party. Not available for hixie.
	 *
	 * @api public
	 */

	Sender.prototype.pong = function(data, options) {};

	/**
	 * Handles an error
	 *
	 * @api private
	 */

	Sender.prototype.error = function (reason) {
	  this.emit('error', reason);
	  return this;
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(3);

	/**
	 * State constants
	 */

	var EMPTY = 0
	  , BODY = 1;
	var BINARYLENGTH = 2
	  , BINARYBODY = 3;

	/**
	 * Hixie Receiver implementation
	 */

	function Receiver () {
	  this.state = EMPTY;
	  this.buffers = [];
	  this.messageEnd = -1;
	  this.spanLength = 0;
	  this.dead = false;

	  this.onerror = function() {};
	  this.ontext = function() {};
	  this.onbinary = function() {};
	  this.onclose = function() {};
	  this.onping = function() {};
	  this.onpong = function() {};
	}

	module.exports = Receiver;

	/**
	 * Add new data to the parser.
	 *
	 * @api public
	 */

	Receiver.prototype.add = function(data) {
	  var self = this;
	  function doAdd() {
	    if (self.state === EMPTY) {
	      if (data.length == 2 && data[0] == 0xFF && data[1] == 0x00) {
	        self.reset();
	        self.onclose();
	        return;
	      }
	      if (data[0] === 0x80) {
	        self.messageEnd = 0;
	        self.state = BINARYLENGTH;
	        data = data.slice(1);
	      } else {

	      if (data[0] !== 0x00) {
	        self.error('payload must start with 0x00 byte', true);
	        return;
	      }
	      data = data.slice(1);
	      self.state = BODY;

	      }
	    }
	    if (self.state === BINARYLENGTH) {
	      var i = 0;
	      while ((i < data.length) && (data[i] & 0x80)) {
	        self.messageEnd = 128 * self.messageEnd + (data[i] & 0x7f);
	        ++i;
	      }
	      if (i < data.length) {
	        self.messageEnd = 128 * self.messageEnd + (data[i] & 0x7f);
	        self.state = BINARYBODY;
	        ++i;
	      }
	      if (i > 0)
	        data = data.slice(i);
	    }
	    if (self.state === BINARYBODY) {
	      var dataleft = self.messageEnd - self.spanLength;
	      if (data.length >= dataleft) {
	        // consume the whole buffer to finish the frame
	        self.buffers.push(data);
	        self.spanLength += dataleft;
	        self.messageEnd = dataleft;
	        return self.parse();
	      }
	      // frame's not done even if we consume it all
	      self.buffers.push(data);
	      self.spanLength += data.length;
	      return;
	    }
	    self.buffers.push(data);
	    if ((self.messageEnd = bufferIndex(data, 0xFF)) != -1) {
	      self.spanLength += self.messageEnd;
	      return self.parse();
	    }
	    else self.spanLength += data.length;
	  }
	  while(data) data = doAdd();
	};

	/**
	 * Releases all resources used by the receiver.
	 *
	 * @api public
	 */

	Receiver.prototype.cleanup = function() {
	  this.dead = true;
	  this.state = EMPTY;
	  this.buffers = [];
	};

	/**
	 * Process buffered data.
	 *
	 * @api public
	 */

	Receiver.prototype.parse = function() {
	  var output = new Buffer(this.spanLength);
	  var outputIndex = 0;
	  for (var bi = 0, bl = this.buffers.length; bi < bl - 1; ++bi) {
	    var buffer = this.buffers[bi];
	    buffer.copy(output, outputIndex);
	    outputIndex += buffer.length;
	  }
	  var lastBuffer = this.buffers[this.buffers.length - 1];
	  if (this.messageEnd > 0) lastBuffer.copy(output, outputIndex, 0, this.messageEnd);
	  if (this.state !== BODY) --this.messageEnd;
	  var tail = null;
	  if (this.messageEnd < lastBuffer.length - 1) {
	    tail = lastBuffer.slice(this.messageEnd + 1);
	  }
	  this.reset();
	  this.ontext(output.toString('utf8'));
	  return tail;
	};

	/**
	 * Handles an error
	 *
	 * @api private
	 */

	Receiver.prototype.error = function (reason, terminate) {
	  this.reset();
	  this.onerror(reason, terminate);
	  return this;
	};

	/**
	 * Reset parser state
	 *
	 * @api private
	 */

	Receiver.prototype.reset = function (reason) {
	  if (this.dead) return;
	  this.state = EMPTY;
	  this.buffers = [];
	  this.messageEnd = -1;
	  this.spanLength = 0;
	};

	/**
	 * Internal api
	 */

	function bufferIndex(buffer, byte) {
	  for (var i = 0, l = buffer.length; i < l; ++i) {
	    if (buffer[i] === byte) return i;
	  }
	  return -1;
	}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(3)
	  , events = __webpack_require__(5)
	  , http = __webpack_require__(17)
	  , crypto = __webpack_require__(22)
	  , Options = __webpack_require__(25)
	  , WebSocket = __webpack_require__(21)
	  , tls = __webpack_require__(7)
	  , url = __webpack_require__(23);

	/**
	 * WebSocket Server implementation
	 */

	function WebSocketServer(options, callback) {
	  options = new Options({
	    host: '0.0.0.0',
	    port: null,
	    server: null,
	    verifyClient: null,
	    handleProtocols: null,
	    path: null,
	    noServer: false,
	    disableHixie: false,
	    clientTracking: true
	  }).merge(options);

	  if (!options.isDefinedAndNonNull('port') && !options.isDefinedAndNonNull('server') && !options.value.noServer) {
	    throw new TypeError('`port` or a `server` must be provided');
	  }

	  var self = this;

	  if (options.isDefinedAndNonNull('port')) {
	    this._server = http.createServer(function (req, res) {
	      res.writeHead(200, {'Content-Type': 'text/plain'});
	      res.end('Not implemented');
	    });
	    this._server.listen(options.value.port, options.value.host, callback);
	    this._closeServer = function() { if (self._server) self._server.close(); };
	  }
	  else if (options.value.server) {
	    this._server = options.value.server;
	    if (options.value.path) {
	      // take note of the path, to avoid collisions when multiple websocket servers are
	      // listening on the same http server
	      if (this._server._webSocketPaths && options.value.server._webSocketPaths[options.value.path]) {
	        throw new Error('two instances of WebSocketServer cannot listen on the same http server path');
	      }
	      if (typeof this._server._webSocketPaths !== 'object') {
	        this._server._webSocketPaths = {};
	      }
	      this._server._webSocketPaths[options.value.path] = 1;
	    }
	  }
	  if (this._server) this._server.once('listening', function() { self.emit('listening'); });

	  if (typeof this._server != 'undefined') {
	    this._server.on('error', function(error) {
	      self.emit('error', error)
	    });
	    this._server.on('upgrade', function(req, socket, upgradeHead) {
	      //copy upgradeHead to avoid retention of large slab buffers used in node core
	      var head = new Buffer(upgradeHead.length);
	      upgradeHead.copy(head);

	      self.handleUpgrade(req, socket, head, function(client) {
	        self.emit('connection'+req.url, client);
	        self.emit('connection', client);
	      });
	    });
	  }

	  this.options = options.value;
	  this.path = options.value.path;
	  this.clients = [];
	}

	/**
	 * Inherits from EventEmitter.
	 */

	util.inherits(WebSocketServer, events.EventEmitter);

	/**
	 * Immediately shuts down the connection.
	 *
	 * @api public
	 */

	WebSocketServer.prototype.close = function() {
	  // terminate all associated clients
	  var error = null;
	  try {
	    for (var i = 0, l = this.clients.length; i < l; ++i) {
	      this.clients[i].terminate();
	    }
	  }
	  catch (e) {
	    error = e;
	  }

	  // remove path descriptor, if any
	  if (this.path && this._server._webSocketPaths) {
	    delete this._server._webSocketPaths[this.path];
	    if (Object.keys(this._server._webSocketPaths).length == 0) {
	      delete this._server._webSocketPaths;
	    }
	  }

	  // close the http server if it was internally created
	  try {
	    if (typeof this._closeServer !== 'undefined') {
	      this._closeServer();
	    }
	  }
	  finally {
	    delete this._server;
	  }
	  if (error) throw error;
	}

	/**
	 * Handle a HTTP Upgrade request.
	 *
	 * @api public
	 */

	WebSocketServer.prototype.handleUpgrade = function(req, socket, upgradeHead, cb) {
	  // check for wrong path
	  if (this.options.path) {
	    var u = url.parse(req.url);
	    if (u && u.pathname !== this.options.path) return;
	  }

	  if (typeof req.headers.upgrade === 'undefined' || req.headers.upgrade.toLowerCase() !== 'websocket') {
	    abortConnection(socket, 400, 'Bad Request');
	    return;
	  }

	  if (req.headers['sec-websocket-key1']) handleHixieUpgrade.apply(this, arguments);
	  else handleHybiUpgrade.apply(this, arguments);
	}

	module.exports = WebSocketServer;

	/**
	 * Entirely private apis,
	 * which may or may not be bound to a sepcific WebSocket instance.
	 */

	function handleHybiUpgrade(req, socket, upgradeHead, cb) {
	  // handle premature socket errors
	  var errorHandler = function() {
	    try { socket.destroy(); } catch (e) {}
	  }
	  socket.on('error', errorHandler);

	  // verify key presence
	  if (!req.headers['sec-websocket-key']) {
	    abortConnection(socket, 400, 'Bad Request');
	    return;
	  }

	  // verify version
	  var version = parseInt(req.headers['sec-websocket-version']);
	  if ([8, 13].indexOf(version) === -1) {
	    abortConnection(socket, 400, 'Bad Request');
	    return;
	  }

	  // verify protocol
	  var protocols = req.headers['sec-websocket-protocol'];

	  // verify client
	  var origin = version < 13 ?
	    req.headers['sec-websocket-origin'] :
	    req.headers['origin'];

	  // handler to call when the connection sequence completes
	  var self = this;
	  var completeHybiUpgrade2 = function(protocol) {

	    // calc key
	    var key = req.headers['sec-websocket-key'];
	    var shasum = crypto.createHash('sha1');
	    shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
	    key = shasum.digest('base64');

	    var headers = [
	        'HTTP/1.1 101 Switching Protocols'
	      , 'Upgrade: websocket'
	      , 'Connection: Upgrade'
	      , 'Sec-WebSocket-Accept: ' + key
	    ];

	    if (typeof protocol != 'undefined') {
	      headers.push('Sec-WebSocket-Protocol: ' + protocol);
	    }

	    // allows external modification/inspection of handshake headers
	    self.emit('headers', headers);

	    socket.setTimeout(0);
	    socket.setNoDelay(true);
	    try {
	      socket.write(headers.concat('', '').join('\r\n'));
	    }
	    catch (e) {
	      // if the upgrade write fails, shut the connection down hard
	      try { socket.destroy(); } catch (e) {}
	      return;
	    }

	    var client = new WebSocket([req, socket, upgradeHead], {
	      protocolVersion: version,
	      protocol: protocol
	    });

	    if (self.options.clientTracking) {
	      self.clients.push(client);
	      client.on('close', function() {
	        var index = self.clients.indexOf(client);
	        if (index != -1) {
	          self.clients.splice(index, 1);
	        }
	      });
	    }

	    // signal upgrade complete
	    socket.removeListener('error', errorHandler);
	    cb(client);
	  }

	  // optionally call external protocol selection handler before
	  // calling completeHybiUpgrade2
	  var completeHybiUpgrade1 = function() {
	    // choose from the sub-protocols
	    if (typeof self.options.handleProtocols == 'function') {
	        var protList = (protocols || "").split(/, */);
	        var callbackCalled = false;
	        var res = self.options.handleProtocols(protList, function(result, protocol) {
	          callbackCalled = true;
	          if (!result) abortConnection(socket, 404, 'Unauthorized')
	          else completeHybiUpgrade2(protocol);
	        });
	        if (!callbackCalled) {
	            // the handleProtocols handler never called our callback
	            abortConnection(socket, 501, 'Could not process protocols');
	        }
	        return;
	    } else {
	        if (typeof protocols !== 'undefined') {
	            completeHybiUpgrade2(protocols.split(/, */)[0]);
	        }
	        else {
	            completeHybiUpgrade2();
	        }
	    }
	  }

	  // optionally call external client verification handler
	  if (typeof this.options.verifyClient == 'function') {
	    var info = {
	      origin: origin,
	      secure: typeof req.connection.authorized !== 'undefined' || typeof req.connection.encrypted !== 'undefined',
	      req: req
	    };
	    if (this.options.verifyClient.length == 2) {
	      this.options.verifyClient(info, function(result, code, name) {
	        if (typeof code === 'undefined') code = 401;
	        if (typeof name === 'undefined') name = http.STATUS_CODES[code];

	        if (!result) abortConnection(socket, code, name);
	        else completeHybiUpgrade1();
	      });
	      return;
	    }
	    else if (!this.options.verifyClient(info)) {
	      abortConnection(socket, 401, 'Unauthorized');
	      return;
	    }
	  }

	  completeHybiUpgrade1();
	}

	function handleHixieUpgrade(req, socket, upgradeHead, cb) {
	  // handle premature socket errors
	  var errorHandler = function() {
	    try { socket.destroy(); } catch (e) {}
	  }
	  socket.on('error', errorHandler);

	  // bail if options prevent hixie
	  if (this.options.disableHixie) {
	    abortConnection(socket, 401, 'Hixie support disabled');
	    return;
	  }

	  // verify key presence
	  if (!req.headers['sec-websocket-key2']) {
	    abortConnection(socket, 400, 'Bad Request');
	    return;
	  }

	  var origin = req.headers['origin']
	    , self = this;

	  // setup handshake completion to run after client has been verified
	  var onClientVerified = function() {
	    var wshost;
	    if (!req.headers['x-forwarded-host'])
	        wshost = req.headers.host;
	    else
	        wshost = req.headers['x-forwarded-host'];
	    var location = ((req.headers['x-forwarded-proto'] === 'https' || socket.encrypted) ? 'wss' : 'ws') + '://' + wshost + req.url
	      , protocol = req.headers['sec-websocket-protocol'];

	    // handshake completion code to run once nonce has been successfully retrieved
	    var completeHandshake = function(nonce, rest) {
	      // calculate key
	      var k1 = req.headers['sec-websocket-key1']
	        , k2 = req.headers['sec-websocket-key2']
	        , md5 = crypto.createHash('md5');

	      [k1, k2].forEach(function (k) {
	        var n = parseInt(k.replace(/[^\d]/g, ''))
	          , spaces = k.replace(/[^ ]/g, '').length;
	        if (spaces === 0 || n % spaces !== 0){
	          abortConnection(socket, 400, 'Bad Request');
	          return;
	        }
	        n /= spaces;
	        md5.update(String.fromCharCode(
	          n >> 24 & 0xFF,
	          n >> 16 & 0xFF,
	          n >> 8  & 0xFF,
	          n       & 0xFF));
	      });
	      md5.update(nonce.toString('binary'));

	      var headers = [
	          'HTTP/1.1 101 Switching Protocols'
	        , 'Upgrade: WebSocket'
	        , 'Connection: Upgrade'
	        , 'Sec-WebSocket-Location: ' + location
	      ];
	      if (typeof protocol != 'undefined') headers.push('Sec-WebSocket-Protocol: ' + protocol);
	      if (typeof origin != 'undefined') headers.push('Sec-WebSocket-Origin: ' + origin);

	      socket.setTimeout(0);
	      socket.setNoDelay(true);
	      try {
	        // merge header and hash buffer
	        var headerBuffer = new Buffer(headers.concat('', '').join('\r\n'));
	        var hashBuffer = new Buffer(md5.digest('binary'), 'binary');
	        var handshakeBuffer = new Buffer(headerBuffer.length + hashBuffer.length);
	        headerBuffer.copy(handshakeBuffer, 0);
	        hashBuffer.copy(handshakeBuffer, headerBuffer.length);

	        // do a single write, which - upon success - causes a new client websocket to be setup
	        socket.write(handshakeBuffer, 'binary', function(err) {
	          if (err) return; // do not create client if an error happens
	          var client = new WebSocket([req, socket, rest], {
	            protocolVersion: 'hixie-76',
	            protocol: protocol
	          });
	          if (self.options.clientTracking) {
	            self.clients.push(client);
	            client.on('close', function() {
	              var index = self.clients.indexOf(client);
	              if (index != -1) {
	                self.clients.splice(index, 1);
	              }
	            });
	          }

	          // signal upgrade complete
	          socket.removeListener('error', errorHandler);
	          cb(client);
	        });
	      }
	      catch (e) {
	        try { socket.destroy(); } catch (e) {}
	        return;
	      }
	    }

	    // retrieve nonce
	    var nonceLength = 8;
	    if (upgradeHead && upgradeHead.length >= nonceLength) {
	      var nonce = upgradeHead.slice(0, nonceLength);
	      var rest = upgradeHead.length > nonceLength ? upgradeHead.slice(nonceLength) : null;
	      completeHandshake.call(self, nonce, rest);
	    }
	    else {
	      // nonce not present in upgradeHead, so we must wait for enough data
	      // data to arrive before continuing
	      var nonce = new Buffer(nonceLength);
	      upgradeHead.copy(nonce, 0);
	      var received = upgradeHead.length;
	      var rest = null;
	      var handler = function (data) {
	        var toRead = Math.min(data.length, nonceLength - received);
	        if (toRead === 0) return;
	        data.copy(nonce, received, 0, toRead);
	        received += toRead;
	        if (received == nonceLength) {
	          socket.removeListener('data', handler);
	          if (toRead < data.length) rest = data.slice(toRead);
	          completeHandshake.call(self, nonce, rest);
	        }
	      }
	      socket.on('data', handler);
	    }
	  }

	  // verify client
	  if (typeof this.options.verifyClient == 'function') {
	    var info = {
	      origin: origin,
	      secure: typeof req.connection.authorized !== 'undefined' || typeof req.connection.encrypted !== 'undefined',
	      req: req
	    };
	    if (this.options.verifyClient.length == 2) {
	      var self = this;
	      this.options.verifyClient(info, function(result, code, name) {
	        if (typeof code === 'undefined') code = 401;
	        if (typeof name === 'undefined') name = http.STATUS_CODES[code];

	        if (!result) abortConnection(socket, code, name);
	        else onClientVerified.apply(self);
	      });
	      return;
	    }
	    else if (!this.options.verifyClient(info)) {
	      abortConnection(socket, 401, 'Unauthorized');
	      return;
	    }
	  }

	  // no client verification required
	  onClientVerified();
	}

	function abortConnection(socket, code, name) {
	  try {
	    var response = [
	      'HTTP/1.1 ' + code + ' ' + name,
	      'Content-type: text/html'
	    ];
	    socket.write(response.concat('', '').join('\r\n'));
	  }
	  catch (e) { /* ignore errors - we've aborted this connection */ }
	  finally {
	    // ensure that an early aborted connection is shut down completely
	    try { socket.destroy(); } catch (e) {}
	  }
	}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	module.exports.TBufferedTransport = __webpack_require__(8);
	module.exports.TFramedTransport = __webpack_require__(39);
	module.exports.InputBufferUnderrunError = __webpack_require__(10);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	var binary = __webpack_require__(9);
	var InputBufferUnderrunError = __webpack_require__(10);

	module.exports = TFramedTransport;

	function TFramedTransport(buffer, callback) {
	  this.inBuf = buffer || new Buffer(0);
	  this.outBuffers = [];
	  this.outCount = 0;
	  this.readPos = 0;
	  this.onFlush = callback;
	};

	TFramedTransport.receiver = function(callback, seqid) {
	  var residual = null;

	  return function(data) {
	    // Prepend any residual data from our previous read
	    if (residual) {
	      data = Buffer.concat([residual, data]);
	      residual = null;
	    }

	    // framed transport
	    while (data.length) {
	      if (data.length < 4) {
	        // Not enough bytes to continue, save and resume on next packet
	        residual = data;
	        return;
	      }
	      var frameSize = binary.readI32(data, 0);
	      if (data.length < 4 + frameSize) {
	        // Not enough bytes to continue, save and resume on next packet
	        residual = data;
	        return;
	      }

	      var frame = data.slice(4, 4 + frameSize);
	      residual = data.slice(4 + frameSize);

	      callback(new TFramedTransport(frame), seqid);

	      data = residual;
	      residual = null;
	    }
	  };
	};

	TFramedTransport.prototype.commitPosition = function(){},
	TFramedTransport.prototype.rollbackPosition = function(){},

	  // TODO: Implement open/close support
	TFramedTransport.prototype.isOpen = function() {
	  return true;
	};
	TFramedTransport.prototype.open = function() {};
	TFramedTransport.prototype.close =  function() {};

	  // Set the seqid of the message in the client
	  // So that callbacks can be found
	TFramedTransport.prototype.setCurrSeqId = function(seqid) {
	  this._seqid = seqid;
	};

	TFramedTransport.prototype.ensureAvailable = function(len) {
	  if (this.readPos + len > this.inBuf.length) {
	    throw new InputBufferUnderrunError();
	  }
	};

	TFramedTransport.prototype.read = function(len) { // this function will be used for each frames.
	  this.ensureAvailable(len);
	  var end = this.readPos + len;

	  if (this.inBuf.length < end) {
	    throw new Error('read(' + len + ') failed - not enough data');
	  }

	  var buf = this.inBuf.slice(this.readPos, end);
	  this.readPos = end;
	  return buf;
	};

	TFramedTransport.prototype.readByte = function() {
	  this.ensureAvailable(1);
	  return binary.readByte(this.inBuf[this.readPos++]);
	};

	TFramedTransport.prototype.readI16 = function() {
	  this.ensureAvailable(2);
	  var i16 = binary.readI16(this.inBuf, this.readPos);
	  this.readPos += 2;
	  return i16;
	};

	TFramedTransport.prototype.readI32 = function() {
	  this.ensureAvailable(4);
	  var i32 = binary.readI32(this.inBuf, this.readPos);
	  this.readPos += 4;
	  return i32;
	};

	TFramedTransport.prototype.readDouble = function() {
	  this.ensureAvailable(8);
	  var d = binary.readDouble(this.inBuf, this.readPos);
	  this.readPos += 8;
	  return d;
	};

	TFramedTransport.prototype.readString = function(len) {
	  this.ensureAvailable(len);
	  var str = this.inBuf.toString('utf8', this.readPos, this.readPos + len);
	  this.readPos += len;
	  return str;
	};

	TFramedTransport.prototype.borrow = function() {
	  return {
	    buf: this.inBuf,
	    readIndex: this.readPos,
	    writeIndex: this.inBuf.length
	  };
	};

	TFramedTransport.prototype.consume = function(bytesConsumed) {
	  this.readPos += bytesConsumed;
	};

	TFramedTransport.prototype.write = function(buf, encoding) {
	  if (typeof(buf) === "string") {
	    buf = new Buffer(buf, encoding || 'utf8');
	  }
	  this.outBuffers.push(buf);
	  this.outCount += buf.length;
	};

	TFramedTransport.prototype.flush = function() {
	  // If the seqid of the callback is available pass it to the onFlush
	  // Then remove the current seqid
	  var seqid = this._seqid;
	  this._seqid = null;

	  var out = new Buffer(this.outCount),
	      pos = 0;
	  this.outBuffers.forEach(function(buf) {
	    buf.copy(out, pos, 0);
	    pos += buf.length;
	  });

	  if (this.onFlush) {
	    // TODO: optimize this better, allocate one buffer instead of both:
	    var msg = new Buffer(out.length + 4);
	    binary.writeI32(msg, out.length);
	    out.copy(msg, 4, 0, out.length);
	    if (this.onFlush) {
	      // Passing seqid through this call to get it to the connection
	      this.onFlush(msg, seqid);
	    }
	  }

	  this.outBuffers = [];
	  this.outCount = 0;
	};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	module.exports.TBinaryProtocol = __webpack_require__(11);
	module.exports.TCompactProtocol = __webpack_require__(41);
	module.exports.TJSONProtocol = __webpack_require__(42);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	var log = __webpack_require__(12);
	var Int64 = __webpack_require__(13);
	var Thrift = __webpack_require__(2);
	var Type = Thrift.Type;

	module.exports = TCompactProtocol;

	var POW_8 = Math.pow(2, 8);
	var POW_24 = Math.pow(2, 24);
	var POW_32 = Math.pow(2, 32);
	var POW_40 = Math.pow(2, 40);
	var POW_48 = Math.pow(2, 48);
	var POW_52 = Math.pow(2, 52);
	var POW_1022 = Math.pow(2, 1022);

	/**
	 * Constructor Function for the Compact Protocol.
	 * @constructor
	 * @param {object} [trans] - The underlying transport to read/write.
	 * @classdesc The Apache Thrift Protocol layer performs serialization
	 *     of base types, the compact protocol serializes data in binary
	 *     form with minimal space used for scalar values.
	 */
	function TCompactProtocol(trans) {
	  this.trans = trans;
	  this.lastField_ = [];
	  this.lastFieldId_ = 0;
	  this.string_limit_ = 0;
	  this.string_buf_ = null;
	  this.string_buf_size_ = 0;
	  this.container_limit_ = 0;
	  this.booleanField_ = {
	    name: null,
	    hasBoolValue: false
	  };
	  this.boolValue_ = {
	    hasBoolValue: false,
	    boolValue: false
	  };
	};


	//
	// Compact Protocol Constants
	//

	/**
	  * Compact Protocol ID number.
	  * @readonly
	  * @const {number} PROTOCOL_ID
	  */
	TCompactProtocol.PROTOCOL_ID = -126;  //1000 0010

	/**
	  * Compact Protocol version number.
	  * @readonly
	  * @const {number} VERSION_N
	  */
	TCompactProtocol.VERSION_N = 1;

	/**
	  * Compact Protocol version mask for combining protocol version and message type in one byte.
	  * @readonly
	  * @const {number} VERSION_MASK
	  */
	TCompactProtocol.VERSION_MASK = 0x1f; //0001 1111

	/**
	  * Compact Protocol message type mask for combining protocol version and message type in one byte.
	  * @readonly
	  * @const {number} TYPE_MASK
	  */
	TCompactProtocol.TYPE_MASK = -32;     //1110 0000

	/**
	  * Compact Protocol message type bits for ensuring message type bit size.
	  * @readonly
	  * @const {number} TYPE_BITS
	  */
	TCompactProtocol.TYPE_BITS = 7; //0000 0111

	/**
	  * Compact Protocol message type shift amount for combining protocol version and message type in one byte.
	  * @readonly
	  * @const {number} TYPE_SHIFT_AMOUNT
	  */
	TCompactProtocol.TYPE_SHIFT_AMOUNT = 5;

	/**
	 * Compact Protocol type IDs used to keep type data within one nibble.
	 * @readonly
	 * @property {number}  CT_STOP          - End of a set of fields.
	 * @property {number}  CT_BOOLEAN_TRUE  - Flag for Boolean field with true value (packed field and value).
	 * @property {number}  CT_BOOLEAN_FALSE - Flag for Boolean field with false value (packed field and value).
	 * @property {number}  CT_BYTE          - Signed 8 bit integer.
	 * @property {number}  CT_I16           - Signed 16 bit integer.
	 * @property {number}  CT_I32           - Signed 32 bit integer.
	 * @property {number}  CT_I64           - Signed 64 bit integer (2^53 max in JavaScript).
	 * @property {number}  CT_DOUBLE        - 64 bit IEEE 854 floating point.
	 * @property {number}  CT_BINARY        - Array of bytes (used for strings also).
	 * @property {number}  CT_LIST          - A collection type (unordered).
	 * @property {number}  CT_SET           - A collection type (unordered and without repeated values).
	 * @property {number}  CT_MAP           - A collection type (map/associative-array/dictionary).
	 * @property {number}  CT_STRUCT        - A multifield type.
	 */
	TCompactProtocol.Types = {
	  CT_STOP:           0x00,
	  CT_BOOLEAN_TRUE:   0x01,
	  CT_BOOLEAN_FALSE:  0x02,
	  CT_BYTE:           0x03,
	  CT_I16:            0x04,
	  CT_I32:            0x05,
	  CT_I64:            0x06,
	  CT_DOUBLE:         0x07,
	  CT_BINARY:         0x08,
	  CT_LIST:           0x09,
	  CT_SET:            0x0A,
	  CT_MAP:            0x0B,
	  CT_STRUCT:         0x0C
	};

	/**
	 * Array mapping Compact type IDs to standard Thrift type IDs.
	 * @readonly
	 */
	TCompactProtocol.TTypeToCType = [
	  TCompactProtocol.Types.CT_STOP,         // T_STOP
	  0,                                      // unused
	  TCompactProtocol.Types.CT_BOOLEAN_TRUE, // T_BOOL
	  TCompactProtocol.Types.CT_BYTE,         // T_BYTE
	  TCompactProtocol.Types.CT_DOUBLE,       // T_DOUBLE
	  0,                                      // unused
	  TCompactProtocol.Types.CT_I16,          // T_I16
	  0,                                      // unused
	  TCompactProtocol.Types.CT_I32,          // T_I32
	  0,                                      // unused
	  TCompactProtocol.Types.CT_I64,          // T_I64
	  TCompactProtocol.Types.CT_BINARY,       // T_STRING
	  TCompactProtocol.Types.CT_STRUCT,       // T_STRUCT
	  TCompactProtocol.Types.CT_MAP,          // T_MAP
	  TCompactProtocol.Types.CT_SET,          // T_SET
	  TCompactProtocol.Types.CT_LIST,         // T_LIST
	];


	//
	// Compact Protocol Utilities
	//

	/**
	 * Returns the underlying transport layer.
	 * @return {object} The underlying transport layer.
	 */TCompactProtocol.prototype.getTransport = function() {
	  return this.trans;
	};

	/**
	 * Lookup a Compact Protocol Type value for a given Thrift Type value.
	 * N.B. Used only internally.
	 * @param {number} ttype - Thrift type value
	 * @returns {number} Compact protocol type value
	 */
	TCompactProtocol.prototype.getCompactType = function(ttype) {
	  return TCompactProtocol.TTypeToCType[ttype];
	};

	/**
	 * Lookup a Thrift Type value for a given Compact Protocol Type value.
	 * N.B. Used only internally.
	 * @param {number} type - Compact Protocol type value
	 * @returns {number} Thrift Type value
	 */
	TCompactProtocol.prototype.getTType = function(type) {
	  switch (type) {
	    case Type.STOP:
	      return Type.STOP;
	    case TCompactProtocol.Types.CT_BOOLEAN_FALSE:
	    case TCompactProtocol.Types.CT_BOOLEAN_TRUE:
	      return Type.BOOL;
	    case TCompactProtocol.Types.CT_BYTE:
	      return Type.BYTE;
	    case TCompactProtocol.Types.CT_I16:
	      return Type.I16;
	    case TCompactProtocol.Types.CT_I32:
	      return Type.I32;
	    case TCompactProtocol.Types.CT_I64:
	      return Type.I64;
	    case TCompactProtocol.Types.CT_DOUBLE:
	      return Type.DOUBLE;
	    case TCompactProtocol.Types.CT_BINARY:
	      return Type.STRING;
	    case TCompactProtocol.Types.CT_LIST:
	      return Type.LIST;
	    case TCompactProtocol.Types.CT_SET:
	      return Type.SET;
	    case TCompactProtocol.Types.CT_MAP:
	      return Type.MAP;
	    case TCompactProtocol.Types.CT_STRUCT:
	      return Type.STRUCT;
	    default:
	      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA, "Unknown type: " + type);
	  }
	  return Type.STOP;
	};


	//
	// Compact Protocol write operations
	//

	/**
	 * Send any buffered bytes to the end point.
	 */
	TCompactProtocol.prototype.flush = function() {
	  return this.trans.flush();
	};

	/**
	 * Writes an RPC message header
	 * @param {string} name - The method name for the message.
	 * @param {number} type - The type of message (CALL, REPLY, EXCEPTION, ONEWAY).
	 * @param {number} seqid - The call sequence number (if any).
	 */
	TCompactProtocol.prototype.writeMessageBegin = function(name, type, seqid) {
	  this.writeByte(TCompactProtocol.PROTOCOL_ID);
	  this.writeByte((TCompactProtocol.VERSION_N & TCompactProtocol.VERSION_MASK) |
	                     ((type << TCompactProtocol.TYPE_SHIFT_AMOUNT) & TCompactProtocol.TYPE_MASK));
	  this.writeVarint32(seqid);
	  this.writeString(name);

	  // Record client seqid to find callback again
	  if (this._seqid) {
	    // TODO better logging log warning
	    log.warning('SeqId already set', { 'name': name });
	  } else {
	    this._seqid = seqid;
	    this.trans.setCurrSeqId(seqid);
	  }
	};

	TCompactProtocol.prototype.writeMessageEnd = function() {
	};

	TCompactProtocol.prototype.writeStructBegin = function(name) {
	  this.lastField_.push(this.lastFieldId_);
	  this.lastFieldId_ = 0;
	};

	TCompactProtocol.prototype.writeStructEnd = function() {
	  this.lastFieldId_ = this.lastField_.pop();
	};

	/**
	 * Writes a struct field header
	 * @param {string} name - The field name (not written with the compact protocol).
	 * @param {number} type - The field data type (a normal Thrift field Type).
	 * @param {number} id - The IDL field Id.
	 */
	TCompactProtocol.prototype.writeFieldBegin = function(name, type, id) {
	  if (type != Type.BOOL) {
	    return this.writeFieldBeginInternal(name, type, id, -1);
	  }

	  this.booleanField_.name = name;
	  this.booleanField_.fieldType = type;
	  this.booleanField_.fieldId = id;
	};

	TCompactProtocol.prototype.writeFieldEnd = function() {
	};

	TCompactProtocol.prototype.writeFieldStop = function() {
	  this.writeByte(TCompactProtocol.Types.CT_STOP);
	};

	/**
	 * Writes a map collection header
	 * @param {number} keyType - The Thrift type of the map keys.
	 * @param {number} valType - The Thrift type of the map values.
	 * @param {number} size - The number of k/v pairs in the map.
	 */
	TCompactProtocol.prototype.writeMapBegin = function(keyType, valType, size) {
	  if (size === 0) {
	    this.writeByte(0);
	  } else {
	    this.writeVarint32(size);
	    this.writeByte(this.getCompactType(keyType) << 4 | this.getCompactType(valType));
	  }
	};

	TCompactProtocol.prototype.writeMapEnd = function() {
	};

	/**
	 * Writes a list collection header
	 * @param {number} elemType - The Thrift type of the list elements.
	 * @param {number} size - The number of elements in the list.
	 */
	TCompactProtocol.prototype.writeListBegin = function(elemType, size) {
	  this.writeCollectionBegin(elemType, size);
	};

	TCompactProtocol.prototype.writeListEnd = function() {
	};

	/**
	 * Writes a set collection header
	 * @param {number} elemType - The Thrift type of the set elements.
	 * @param {number} size - The number of elements in the set.
	 */
	TCompactProtocol.prototype.writeSetBegin = function(elemType, size) {
	  this.writeCollectionBegin(elemType, size);
	};

	TCompactProtocol.prototype.writeSetEnd = function() {
	};

	TCompactProtocol.prototype.writeBool = function(value) {
	  if (this.booleanField_.name !== null) {
	    // we haven't written the field header yet
	    this.writeFieldBeginInternal(this.booleanField_.name,
	                                 this.booleanField_.fieldType,
	                                 this.booleanField_.fieldId,
	                                 (value ? TCompactProtocol.Types.CT_BOOLEAN_TRUE
	                                          : TCompactProtocol.Types.CT_BOOLEAN_FALSE));
	    this.booleanField_.name = null;
	  } else {
	    // we're not part of a field, so just write the value
	    this.writeByte((value ? TCompactProtocol.Types.CT_BOOLEAN_TRUE
	                            : TCompactProtocol.Types.CT_BOOLEAN_FALSE));
	  }
	};

	TCompactProtocol.prototype.writeByte = function(b) {
	  this.trans.write(new Buffer([b]));
	};

	TCompactProtocol.prototype.writeI16 = function(i16) {
	  this.writeVarint32(this.i32ToZigzag(i16));
	};

	TCompactProtocol.prototype.writeI32 = function(i32) {
	  this.writeVarint32(this.i32ToZigzag(i32));
	};

	TCompactProtocol.prototype.writeI64 = function(i64) {
	  this.writeVarint64(this.i64ToZigzag(i64));
	};

	// Little-endian, unlike TBinaryProtocol
	TCompactProtocol.prototype.writeDouble = function(v) {
	  var buff = new Buffer(8);
	  var m, e, c;

	  buff[7] = (v < 0 ? 0x80 : 0x00);

	  v = Math.abs(v);
	  if (v !== v) {
	    // NaN, use QNaN IEEE format
	    m = 2251799813685248;
	    e = 2047;
	  } else if (v === Infinity) {
	    m = 0;
	    e = 2047;
	  } else {
	    e = Math.floor(Math.log(v) / Math.LN2);
	    c = Math.pow(2, -e);
	    if (v * c < 1) {
	      e--;
	      c *= 2;
	    }

	    if (e + 1023 >= 2047)
	    {
	      // Overflow
	      m = 0;
	      e = 2047;
	    }
	    else if (e + 1023 >= 1)
	    {
	      // Normalized - term order matters, as Math.pow(2, 52-e) and v*Math.pow(2, 52) can overflow
	      m = (v*c-1) * POW_52;
	      e += 1023;
	    }
	    else
	    {
	      // Denormalized - also catches the '0' case, somewhat by chance
	      m = (v * POW_1022) * POW_52;
	      e = 0;
	    }
	  }

	  buff[6] = (e << 4) & 0xf0;
	  buff[7] |= (e >> 4) & 0x7f;

	  buff[0] = m & 0xff;
	  m = Math.floor(m / POW_8);
	  buff[1] = m & 0xff;
	  m = Math.floor(m / POW_8);
	  buff[2] = m & 0xff;
	  m = Math.floor(m / POW_8);
	  buff[3] = m & 0xff;
	  m >>= 8;
	  buff[4] = m & 0xff;
	  m >>= 8;
	  buff[5] = m & 0xff;
	  m >>= 8;
	  buff[6] |= m & 0x0f;

	  this.trans.write(buff);
	};

	TCompactProtocol.prototype.writeStringOrBinary = function(name, encoding, arg) {
	  if (typeof arg === 'string') {
	    this.writeVarint32(Buffer.byteLength(arg, encoding)) ;
	    this.trans.write(new Buffer(arg, encoding));
	  } else if (arg instanceof Buffer ||
	             Object.prototype.toString.call(arg) == '[object Uint8Array]') {
	    // Buffers in Node.js under Browserify may extend UInt8Array instead of
	    // defining a new object. We detect them here so we can write them
	    // correctly
	    this.writeVarint32(arg.length);
	    this.trans.write(arg);
	  } else {
	    throw new Error(name + ' called without a string/Buffer argument: ' + arg);
	  }
	};

	TCompactProtocol.prototype.writeString = function(arg) {
	  this.writeStringOrBinary('writeString', 'utf8', arg);
	};

	TCompactProtocol.prototype.writeBinary = function(arg) {
	  this.writeStringOrBinary('writeBinary', 'binary', arg);
	};


	//
	// Compact Protocol internal write methods
	//

	TCompactProtocol.prototype.writeFieldBeginInternal = function(name,
	                                                              fieldType,
	                                                              fieldId,
	                                                              typeOverride) {
	  //If there's a type override, use that.
	  var typeToWrite = (typeOverride == -1 ? this.getCompactType(fieldType) : typeOverride);
	  //Check if we can delta encode the field id
	  if (fieldId > this.lastFieldId_ && fieldId - this.lastFieldId_ <= 15) {
	    //Include the type delta with the field ID
	    this.writeByte((fieldId - this.lastFieldId_) << 4 | typeToWrite);
	  } else {
	    //Write separate type and ID values
	    this.writeByte(typeToWrite);
	    this.writeI16(fieldId);
	  }
	  this.lastFieldId_ = fieldId;
	};

	TCompactProtocol.prototype.writeCollectionBegin = function(elemType, size) {
	  if (size <= 14) {
	    //Combine size and type in one byte if possible
	    this.writeByte(size << 4 | this.getCompactType(elemType));
	  } else {
	    this.writeByte(0xf0 | this.getCompactType(elemType));
	    this.writeVarint32(size);
	  }
	};

	/**
	 * Write an i32 as a varint. Results in 1-5 bytes on the wire.
	 */
	TCompactProtocol.prototype.writeVarint32 = function(n) {
	  var buf = new Buffer(5);
	  var wsize = 0;
	  while (true) {
	    if ((n & ~0x7F) === 0) {
	      buf[wsize++] = n;
	      break;
	    } else {
	      buf[wsize++] = ((n & 0x7F) | 0x80);
	      n = n >>> 7;
	    }
	  }
	  var wbuf = new Buffer(wsize);
	  buf.copy(wbuf,0,0,wsize);
	  this.trans.write(wbuf);
	};

	/**
	 * Write an i64 as a varint. Results in 1-10 bytes on the wire.
	 * N.B. node-int64 is always big endian
	 */
	TCompactProtocol.prototype.writeVarint64 = function(n) {
	  if (typeof n === "number"){
	    n = new Int64(n);
	  }
	  if (! (n instanceof Int64)) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA, "Expected Int64 or Number, found: " + n);
	  }

	  var buf = new Buffer(10);
	  var wsize = 0;
	  var hi = n.buffer.readUInt32BE(0, true);
	  var lo = n.buffer.readUInt32BE(4, true);
	  var mask = 0;
	  while (true) {
	    if (((lo & ~0x7F) === 0) && (hi === 0)) {
	      buf[wsize++] = lo;
	      break;
	    } else {
	      buf[wsize++] = ((lo & 0x7F) | 0x80);
	      mask = hi << 25;
	      lo = lo >>> 7;
	      hi = hi >>> 7;
	      lo = lo | mask;
	    }
	  }
	  var wbuf = new Buffer(wsize);
	  buf.copy(wbuf,0,0,wsize);
	  this.trans.write(wbuf);
	};

	/**
	 * Convert l into a zigzag long. This allows negative numbers to be
	 * represented compactly as a varint.
	 */
	TCompactProtocol.prototype.i64ToZigzag = function(l) {
	  if (typeof l === 'string') {
	    l = new Int64(parseInt(l, 10));
	  } else if (typeof l === 'number') {
	    l = new Int64(l);
	  }
	  if (! (l instanceof Int64)) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA, "Expected Int64 or Number, found: " + l);
	  }
	  var hi = l.buffer.readUInt32BE(0, true);
	  var lo = l.buffer.readUInt32BE(4, true);
	  var sign = hi >>> 31;
	  hi = ((hi << 1) | (lo >>> 31)) ^ ((!!sign) ? 0xFFFFFFFF : 0);
	  lo = (lo << 1) ^ ((!!sign) ? 0xFFFFFFFF : 0);
	  return new Int64(hi, lo);
	};

	/**
	 * Convert n into a zigzag int. This allows negative numbers to be
	 * represented compactly as a varint.
	 */
	TCompactProtocol.prototype.i32ToZigzag = function(n) {
	  return (n << 1) ^ ((n & 0x80000000) ? 0xFFFFFFFF : 0);
	};


	//
	// Compact Protocol read operations
	//

	TCompactProtocol.prototype.readMessageBegin = function() {
	  //Read protocol ID
	  var protocolId = this.trans.readByte();
	  if (protocolId != TCompactProtocol.PROTOCOL_ID) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.BAD_VERSION, "Bad protocol identifier " + protocolId);
	  }

	  //Read Version and Type
	  var versionAndType = this.trans.readByte();
	  var version = (versionAndType & TCompactProtocol.VERSION_MASK);
	  if (version != TCompactProtocol.VERSION_N) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.BAD_VERSION, "Bad protocol version " + version);
	  }
	  var type = ((versionAndType >> TCompactProtocol.TYPE_SHIFT_AMOUNT) & TCompactProtocol.TYPE_BITS);

	  //Read SeqId
	  var seqid = this.readVarint32();

	  //Read name
	  var name = this.readString();

	  return {fname: name, mtype: type, rseqid: seqid};
	};

	TCompactProtocol.prototype.readMessageEnd = function() {
	};

	TCompactProtocol.prototype.readStructBegin = function() {
	  this.lastField_.push(this.lastFieldId_);
	  this.lastFieldId_ = 0;
	  return {fname: ''};
	};

	TCompactProtocol.prototype.readStructEnd = function() {
	  this.lastFieldId_ = this.lastField_.pop();
	};

	TCompactProtocol.prototype.readFieldBegin = function() {
	  var fieldId = 0;
	  var b = this.trans.readByte(b);
	  var type = (b & 0x0f);

	  if (type == TCompactProtocol.Types.CT_STOP) {
	    return {fname: null, ftype: Thrift.Type.STOP, fid: 0};
	  }

	  //Mask off the 4 MSB of the type header to check for field id delta.
	  var modifier = ((b & 0x000000f0) >>> 4);
	  if (modifier === 0) {
	    //If not a delta read the field id.
	    fieldId = this.readI16();
	  } else {
	    //Recover the field id from the delta
	    fieldId = (this.lastFieldId_ + modifier);
	  }
	  var fieldType = this.getTType(type);

	  //Boolean are encoded with the type
	  if (type == TCompactProtocol.Types.CT_BOOLEAN_TRUE ||
	      type == TCompactProtocol.Types.CT_BOOLEAN_FALSE) {
	    this.boolValue_.hasBoolValue = true;
	    this.boolValue_.boolValue =
	      (type == TCompactProtocol.Types.CT_BOOLEAN_TRUE ? true : false);
	  }

	  //Save the new field for the next delta computation.
	  this.lastFieldId_ = fieldId;
	  return {fname: null, ftype: fieldType, fid: fieldId};
	};

	TCompactProtocol.prototype.readFieldEnd = function() {
	};

	TCompactProtocol.prototype.readMapBegin = function() {
	  var msize = this.readVarint32();
	  if (msize < 0) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, "Negative map size");
	  }

	  var kvType = 0;
	  if (msize !== 0) {
	    kvType = this.trans.readByte();
	  }

	  var keyType = this.getTType((kvType & 0xf0) >>> 4);
	  var valType = this.getTType(kvType & 0xf);
	  return {ktype: keyType, vtype: valType, size: msize};
	};

	TCompactProtocol.prototype.readMapEnd = function() {
	};

	TCompactProtocol.prototype.readListBegin = function() {
	  var size_and_type = this.trans.readByte();

	  var lsize = (size_and_type >>> 4) & 0x0000000f;
	  if (lsize == 15) {
	    lsize = this.readVarint32();
	  }

	  if (lsize < 0) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, "Negative list size");
	  }

	  var elemType = this.getTType(size_and_type & 0x0000000f);

	  return {etype: elemType, size: lsize};
	};

	TCompactProtocol.prototype.readListEnd = function() {
	};

	TCompactProtocol.prototype.readSetBegin = function() {
	  return this.readListBegin();
	};

	TCompactProtocol.prototype.readSetEnd = function() {
	};

	TCompactProtocol.prototype.readBool = function() {
	  var value = false;
	  var rsize = 0;
	  if (this.boolValue_.hasBoolValue === true) {
	    value = this.boolValue_.boolValue;
	    this.boolValue_.hasBoolValue = false;
	  } else {
	    var res = this.trans.readByte();
	    rsize = res.rsize;
	    value = (res.value == TCompactProtocol.Types.CT_BOOLEAN_TRUE);
	  }
	  return value;
	};

	TCompactProtocol.prototype.readByte = function() {
	  return this.trans.readByte();
	};

	TCompactProtocol.prototype.readI16 = function() {
	  return this.readI32();
	};

	TCompactProtocol.prototype.readI32 = function() {
	  return this.zigzagToI32(this.readVarint32());
	};

	TCompactProtocol.prototype.readI64 = function() {
	  return this.zigzagToI64(this.readVarint64());
	};

	// Little-endian, unlike TBinaryProtocol
	TCompactProtocol.prototype.readDouble = function() {
	  var buff = this.trans.read(8);
	  var off = 0;

	  var signed = buff[off + 7] & 0x80;
	  var e = (buff[off+6] & 0xF0) >> 4;
	  e += (buff[off+7] & 0x7F) << 4;

	  var m = buff[off];
	  m += buff[off+1] << 8;
	  m += buff[off+2] << 16;
	  m += buff[off+3] * POW_24;
	  m += buff[off+4] * POW_32;
	  m += buff[off+5] * POW_40;
	  m += (buff[off+6] & 0x0F) * POW_48;

	  switch (e) {
	    case 0:
	      e = -1022;
	      break;
	    case 2047:
	      return m ? NaN : (signed ? -Infinity : Infinity);
	    default:
	      m += POW_52;
	      e -= 1023;
	  }

	  if (signed) {
	    m *= -1;
	  }

	  return m * Math.pow(2, e - 52);
	};

	TCompactProtocol.prototype.readBinary = function() {
	  var size = this.readVarint32();
	  if (size === 0) {
	    return new Buffer(0);
	  }

	  if (size < 0) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, "Negative binary size");
	  }
	  return this.trans.read(size);
	};

	TCompactProtocol.prototype.readString = function() {
	  var size = this.readVarint32();
	  // Catch empty string case
	  if (size === 0) {
	    return "";
	  }

	  // Catch error cases
	  if (size < 0) {
	    throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.NEGATIVE_SIZE, "Negative string size");
	  }
	  return this.trans.readString(size);
	};


	//
	// Compact Protocol internal read operations
	//

	/**
	 * Read an i32 from the wire as a varint. The MSB of each byte is set
	 * if there is another byte to follow. This can read up to 5 bytes.
	 */
	TCompactProtocol.prototype.readVarint32 = function() {
	  return this.readVarint64().toNumber();
	};

	/**
	 * Read an i64 from the wire as a proper varint. The MSB of each byte is set
	 * if there is another byte to follow. This can read up to 10 bytes.
	 */
	TCompactProtocol.prototype.readVarint64 = function() {
	  var rsize = 0;
	  var lo = 0;
	  var hi = 0;
	  var shift = 0;
	  while (true) {
	    var b = this.trans.readByte();
	    rsize ++;
	    if (shift <= 25) {
	      lo = lo | ((b & 0x7f) << shift);
	    } else if (25 < shift && shift < 32) {
	      lo = lo | ((b & 0x7f) << shift);
	      hi = hi | ((b & 0x7f) >>> (32-shift));
	    } else {
	      hi = hi | ((b & 0x7f) << (shift-32));
	    }
	    shift += 7;
	    if (!(b & 0x80)) {
	      break;
	    }
	    if (rsize >= 10) {
	      throw new Thrift.TProtocolException(Thrift.TProtocolExceptionType.INVALID_DATA, "Variable-length int over 10 bytes.");
	    }
	  }
	  return new Int64(hi, lo);
	};

	/**
	 * Convert from zigzag int to int.
	 */
	TCompactProtocol.prototype.zigzagToI32 = function(n) {
	  return (n >>> 1) ^ (-1 * (n & 1));
	};

	/**
	 * Convert from zigzag long to long.
	 */
	TCompactProtocol.prototype.zigzagToI64 = function(n) {
	  var hi = n.buffer.readUInt32BE(0, true);
	  var lo = n.buffer.readUInt32BE(4, true);

	  var neg = new Int64(hi & 0, lo & 1);
	  neg._2scomp();
	  var hi_neg = neg.buffer.readUInt32BE(0, true);
	  var lo_neg = neg.buffer.readUInt32BE(4, true);

	  var hi_lo = (hi << 31);
	  hi = (hi >>> 1) ^ (hi_neg);
	  lo = ((lo >>> 1) | hi_lo) ^ (lo_neg);
	  return new Int64(hi, lo);
	};

	TCompactProtocol.prototype.skip = function(type) {
	  switch (type) {
	    case Type.STOP:
	      return;
	    case Type.BOOL:
	      this.readBool();
	      break;
	    case Type.BYTE:
	      this.readByte();
	      break;
	    case Type.I16:
	      this.readI16();
	      break;
	    case Type.I32:
	      this.readI32();
	      break;
	    case Type.I64:
	      this.readI64();
	      break;
	    case Type.DOUBLE:
	      this.readDouble();
	      break;
	    case Type.STRING:
	      this.readString();
	      break;
	    case Type.STRUCT:
	      this.readStructBegin();
	      while (true) {
	        var r = this.readFieldBegin();
	        if (r.ftype === Type.STOP) {
	          break;
	        }
	        this.skip(r.ftype);
	        this.readFieldEnd();
	      }
	      this.readStructEnd();
	      break;
	    case Type.MAP:
	      var mapBegin = this.readMapBegin();
	      for (var i = 0; i < mapBegin.size; ++i) {
	        this.skip(mapBegin.ktype);
	        this.skip(mapBegin.vtype);
	      }
	      this.readMapEnd();
	      break;
	    case Type.SET:
	      var setBegin = this.readSetBegin();
	      for (var i2 = 0; i2 < setBegin.size; ++i2) {
	        this.skip(setBegin.etype);
	      }
	      this.readSetEnd();
	      break;
	    case Type.LIST:
	      var listBegin = this.readListBegin();
	      for (var i3 = 0; i3 < listBegin.size; ++i3) {
	        this.skip(listBegin.etype);
	      }
	      this.readListEnd();
	      break;
	    default:
	      throw new  Error("Invalid type: " + type);
	  }
	};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	var log = __webpack_require__(12);
	var Int64 = __webpack_require__(13);
	var InputBufferUnderrunError = __webpack_require__(38).InputBufferUnderrunError;
	var Thrift = __webpack_require__(2);
	var Type = Thrift.Type;
	var util = __webpack_require__(3);

	var Int64Util = __webpack_require__(43);
	var json_parse = __webpack_require__(44);

	var InputBufferUnderrunError = __webpack_require__(10);

	module.exports = TJSONProtocol;

	/**
	 * Initializes a Thrift JSON protocol instance.
	 * @constructor
	 * @param {Thrift.Transport} trans - The transport to serialize to/from.
	 * @classdesc Apache Thrift Protocols perform serialization which enables cross
	 * language RPC. The Protocol type is the JavaScript browser implementation
	 * of the Apache Thrift TJSONProtocol.
	 * @example
	 *     var protocol  = new Thrift.Protocol(transport);
	 */
	function TJSONProtocol(trans) {
	  this.tstack = [];
	  this.tpos = [];
	  this.trans = trans;
	};

	/**
	 * Thrift IDL type Id to string mapping.
	 * @readonly
	 * @see {@link Thrift.Type}
	 */
	TJSONProtocol.Type = {};
	TJSONProtocol.Type[Type.BOOL] = '"tf"';
	TJSONProtocol.Type[Type.BYTE] = '"i8"';
	TJSONProtocol.Type[Type.I16] = '"i16"';
	TJSONProtocol.Type[Type.I32] = '"i32"';
	TJSONProtocol.Type[Type.I64] = '"i64"';
	TJSONProtocol.Type[Type.DOUBLE] = '"dbl"';
	TJSONProtocol.Type[Type.STRUCT] = '"rec"';
	TJSONProtocol.Type[Type.STRING] = '"str"';
	TJSONProtocol.Type[Type.MAP] = '"map"';
	TJSONProtocol.Type[Type.LIST] = '"lst"';
	TJSONProtocol.Type[Type.SET] = '"set"';

	/**
	 * Thrift IDL type string to Id mapping.
	 * @readonly
	 * @see {@link Thrift.Type}
	 */
	TJSONProtocol.RType = {};
	TJSONProtocol.RType.tf = Type.BOOL;
	TJSONProtocol.RType.i8 = Type.BYTE;
	TJSONProtocol.RType.i16 = Type.I16;
	TJSONProtocol.RType.i32 = Type.I32;
	TJSONProtocol.RType.i64 = Type.I64;
	TJSONProtocol.RType.dbl = Type.DOUBLE;
	TJSONProtocol.RType.rec = Type.STRUCT;
	TJSONProtocol.RType.str = Type.STRING;
	TJSONProtocol.RType.map = Type.MAP;
	TJSONProtocol.RType.lst = Type.LIST;
	TJSONProtocol.RType.set = Type.SET;

	/**
	 * The TJSONProtocol version number.
	 * @readonly
	 * @const {number} Version
	 * @memberof Thrift.Protocol
	 */
	TJSONProtocol.Version = 1;

	TJSONProtocol.prototype.flush = function() {
	  this.writeToTransportIfStackIsFlushable();
	  return this.trans.flush();
	};

	TJSONProtocol.prototype.writeToTransportIfStackIsFlushable = function() {
	  if (this.tstack.length === 1) {
	    this.trans.write(this.tstack.pop());
	  }
	};

	/**
	 * Serializes the beginning of a Thrift RPC message.
	 * @param {string} name - The service method to call.
	 * @param {Thrift.MessageType} messageType - The type of method call.
	 * @param {number} seqid - The sequence number of this call (always 0 in Apache Thrift).
	 */
	TJSONProtocol.prototype.writeMessageBegin = function(name, messageType, seqid) {
	  this.tstack.push([TJSONProtocol.Version, '"' + name + '"', messageType, seqid]);
	};

	/**
	 * Serializes the end of a Thrift RPC message.
	 */
	TJSONProtocol.prototype.writeMessageEnd = function() {
	  var obj = this.tstack.pop();

	  this.wobj = this.tstack.pop();
	  this.wobj.push(obj);

	  this.wbuf = '[' + this.wobj.join(',') + ']';

	  // we assume there is nothing more to come so we write
	  this.trans.write(this.wbuf);
	};

	/**
	 * Serializes the beginning of a struct.
	 * @param {string} name - The name of the struct.
	 */
	TJSONProtocol.prototype.writeStructBegin = function(name) {
	  this.tpos.push(this.tstack.length);
	  this.tstack.push({});
	};

	/**
	 * Serializes the end of a struct.
	 */
	TJSONProtocol.prototype.writeStructEnd = function() {
	  var p = this.tpos.pop();
	  var struct = this.tstack[p];
	  var str = '{';
	  var first = true;
	  for (var key in struct) {
	    if (first) {
	      first = false;
	    } else {
	      str += ',';
	    }

	    str += key + ':' + struct[key];
	  }

	  str += '}';
	  this.tstack[p] = str;

	  this.writeToTransportIfStackIsFlushable();
	};

	/**
	 * Serializes the beginning of a struct field.
	 * @param {string} name - The name of the field.
	 * @param {Thrift.Protocol.Type} fieldType - The data type of the field.
	 * @param {number} fieldId - The field's unique identifier.
	 */
	TJSONProtocol.prototype.writeFieldBegin = function(name, fieldType, fieldId) {
	  this.tpos.push(this.tstack.length);
	  this.tstack.push({ 'fieldId': '"' +
	    fieldId + '"', 'fieldType': TJSONProtocol.Type[fieldType]
	  });
	};

	/**
	 * Serializes the end of a field.
	 */
	TJSONProtocol.prototype.writeFieldEnd = function() {
	  var value = this.tstack.pop();
	  var fieldInfo = this.tstack.pop();

	  if (':' + value === ":[object Object]") {
	    this.tstack[this.tstack.length - 1][fieldInfo.fieldId] = '{' +
	      fieldInfo.fieldType + ':' + JSON.stringify(value) + '}';
	  } else {
	    this.tstack[this.tstack.length - 1][fieldInfo.fieldId] = '{' +
	      fieldInfo.fieldType + ':' + value + '}';
	  }
	  this.tpos.pop();

	  this.writeToTransportIfStackIsFlushable();
	};

	/**
	 * Serializes the end of the set of fields for a struct.
	 */
	TJSONProtocol.prototype.writeFieldStop = function() {
	};

	/**
	 * Serializes the beginning of a map collection.
	 * @param {Thrift.Type} keyType - The data type of the key.
	 * @param {Thrift.Type} valType - The data type of the value.
	 * @param {number} [size] - The number of elements in the map (ignored).
	 */
	TJSONProtocol.prototype.writeMapBegin = function(keyType, valType, size) {
	  //size is invalid, we'll set it on end.
	  this.tpos.push(this.tstack.length);
	  this.tstack.push([TJSONProtocol.Type[keyType], TJSONProtocol.Type[valType], 0]);
	};

	/**
	 * Serializes the end of a map.
	 */
	TJSONProtocol.prototype.writeMapEnd = function() {
	  var p = this.tpos.pop();

	  if (p == this.tstack.length) {
	    return;
	  }

	  if ((this.tstack.length - p - 1) % 2 !== 0) {
	    this.tstack.push('');
	  }

	  var size = (this.tstack.length - p - 1) / 2;

	  this.tstack[p][this.tstack[p].length - 1] = size;

	  var map = '}';
	  var first = true;
	  while (this.tstack.length > p + 1) {
	    var v = this.tstack.pop();
	    var k = this.tstack.pop();
	    if (first) {
	      first = false;
	    } else {
	      map = ',' + map;
	    }

	    if (! isNaN(k)) { k = '"' + k + '"'; } //json "keys" need to be strings
	    map = k + ':' + v + map;
	  }
	  map = '{' + map;

	  this.tstack[p].push(map);
	  this.tstack[p] = '[' + this.tstack[p].join(',') + ']';

	  this.writeToTransportIfStackIsFlushable();
	};

	/**
	 * Serializes the beginning of a list collection.
	 * @param {Thrift.Type} elemType - The data type of the elements.
	 * @param {number} size - The number of elements in the list.
	 */
	TJSONProtocol.prototype.writeListBegin = function(elemType, size) {
	  this.tpos.push(this.tstack.length);
	  this.tstack.push([TJSONProtocol.Type[elemType], size]);
	};

	/**
	 * Serializes the end of a list.
	 */
	TJSONProtocol.prototype.writeListEnd = function() {
	  var p = this.tpos.pop();

	  while (this.tstack.length > p + 1) {
	    var tmpVal = this.tstack[p + 1];
	    this.tstack.splice(p + 1, 1);
	    this.tstack[p].push(tmpVal);
	  }

	  this.tstack[p] = '[' + this.tstack[p].join(',') + ']';

	  this.writeToTransportIfStackIsFlushable();
	};

	/**
	 * Serializes the beginning of a set collection.
	 * @param {Thrift.Type} elemType - The data type of the elements.
	 * @param {number} size - The number of elements in the list.
	 */
	TJSONProtocol.prototype.writeSetBegin = function(elemType, size) {
	    this.tpos.push(this.tstack.length);
	    this.tstack.push([TJSONProtocol.Type[elemType], size]);
	};

	/**
	 * Serializes the end of a set.
	 */
	TJSONProtocol.prototype.writeSetEnd = function() {
	  var p = this.tpos.pop();

	  while (this.tstack.length > p + 1) {
	    var tmpVal = this.tstack[p + 1];
	    this.tstack.splice(p + 1, 1);
	    this.tstack[p].push(tmpVal);
	  }

	  this.tstack[p] = '[' + this.tstack[p].join(',') + ']';

	  this.writeToTransportIfStackIsFlushable();
	};

	/** Serializes a boolean */
	TJSONProtocol.prototype.writeBool = function(bool) {
	  this.tstack.push(bool ? 1 : 0);
	};

	/** Serializes a number */
	TJSONProtocol.prototype.writeByte = function(byte) {
	  this.tstack.push(byte);
	};

	/** Serializes a number */
	TJSONProtocol.prototype.writeI16 = function(i16) {
	  this.tstack.push(i16);
	};

	/** Serializes a number */
	TJSONProtocol.prototype.writeI32 = function(i32) {
	  this.tstack.push(i32);
	};

	/** Serializes a number */
	TJSONProtocol.prototype.writeI64 = function(i64) {
	  if (i64 instanceof Int64) {
	    this.tstack.push(Int64Util.toDecimalString(i64));
	  } else {
	    this.tstack.push(i64);
	  }
	};

	/** Serializes a number */
	TJSONProtocol.prototype.writeDouble = function(dub) {
	  this.tstack.push(dub);
	};

	/** Serializes a string */
	TJSONProtocol.prototype.writeString = function(arg) {
	  // We do not encode uri components for wire transfer:
	  if (arg === null) {
	      this.tstack.push(null);
	  } else {
	      if (typeof arg === 'string') {
	        var str = arg;
	      } else if (arg instanceof Buffer) {
	        var str = arg.toString('utf8');
	      } else {
	        throw new Error('writeString called without a string/Buffer argument: ' + arg);
	      }

	      // concat may be slower than building a byte buffer
	      var escapedString = '';
	      for (var i = 0; i < str.length; i++) {
	          var ch = str.charAt(i);      // a single double quote: "
	          if (ch === '\"') {
	              escapedString += '\\\"'; // write out as: \"
	          } else if (ch === '\\') {    // a single backslash: \
	              escapedString += '\\\\'; // write out as: \\
	          /* Currently escaped forward slashes break TJSONProtocol.
	           * As it stands, we can simply pass forward slashes into
	           * our strings across the wire without being escaped.
	           * I think this is the protocol's bug, not thrift.js
	           * } else if(ch === '/') {   // a single forward slash: /
	           *  escapedString += '\\/';  // write out as \/
	           * }
	           */
	          } else if (ch === '\b') {    // a single backspace: invisible
	              escapedString += '\\b';  // write out as: \b"
	          } else if (ch === '\f') {    // a single formfeed: invisible
	              escapedString += '\\f';  // write out as: \f"
	          } else if (ch === '\n') {    // a single newline: invisible
	              escapedString += '\\n';  // write out as: \n"
	          } else if (ch === '\r') {    // a single return: invisible
	              escapedString += '\\r';  // write out as: \r"
	          } else if (ch === '\t') {    // a single tab: invisible
	              escapedString += '\\t';  // write out as: \t"
	          } else {
	              escapedString += ch;     // Else it need not be escaped
	          }
	      }
	      this.tstack.push('"' + escapedString + '"');
	  }
	};

	/** Serializes a string */
	TJSONProtocol.prototype.writeBinary = function(arg) {
	  if (typeof arg === 'string') {
	    var buf = new Buffer(arg, 'binary');
	  } else if (arg instanceof Buffer ||
	             Object.prototype.toString.call(arg) == '[object Uint8Array]')  {
	    var buf = arg;
	  } else {
	    throw new Error('writeBinary called without a string/Buffer argument: ' + arg);
	  }
	  this.tstack.push('"' + buf.toString('base64') + '"');
	};

	/**
	 * @class
	 * @name AnonReadMessageBeginReturn
	 * @property {string} fname - The name of the service method.
	 * @property {Thrift.MessageType} mtype - The type of message call.
	 * @property {number} rseqid - The sequence number of the message (0 in Thrift RPC).
	 */
	/**
	 * Deserializes the beginning of a message.
	 * @returns {AnonReadMessageBeginReturn}
	 */
	TJSONProtocol.prototype.readMessageBegin = function() {
	  this.rstack = [];
	  this.rpos = [];

	  //Borrow the inbound transport buffer and ensure data is present/consistent
	  var transBuf = this.trans.borrow();
	  if (transBuf.readIndex >= transBuf.writeIndex) {
	    throw new InputBufferUnderrunError();
	  }
	  var cursor = transBuf.readIndex;

	  if (transBuf.buf[cursor] !== 0x5B) { //[
	    throw new Error("Malformed JSON input, no opening bracket");
	  }

	  //Parse a single message (there may be several in the buffer)
	  //  TODO: Handle characters using multiple code units
	  cursor++;
	  var openBracketCount = 1;
	  var inString = false;
	  for (; cursor < transBuf.writeIndex; cursor++) {
	    var chr = transBuf.buf[cursor];
	    //we use hexa charcode here because data[i] returns an int and not a char
	    if (inString) {
	      if (chr === 0x22) { //"
	        inString = false;
	      } else if (chr === 0x5C) { //\
	        //escaped character, skip
	        cursor += 1;
	      }
	    } else {
	      if (chr === 0x5B) { //[
	        openBracketCount += 1;
	      } else if (chr === 0x5D) { //]
	        openBracketCount -= 1;
	        if (openBracketCount === 0) {
	          //end of json message detected
	          break;
	        }
	      } else if (chr === 0x22) { //"
	        inString = true;
	      }
	    }
	  }

	  if (openBracketCount !== 0) {
	    // Missing closing bracket. Can be buffer underrun.
	    throw new InputBufferUnderrunError();
	  }

	  //Reconstitute the JSON object and conume the necessary bytes
	  this.robj = json_parse(transBuf.buf.slice(transBuf.readIndex, cursor+1).toString());
	  this.trans.consume(cursor + 1 - transBuf.readIndex);

	  //Verify the protocol version
	  var version = this.robj.shift();
	  if (version != TJSONProtocol.Version) {
	    throw new Error('Wrong thrift protocol version: ' + version);
	  }

	  //Objectify the thrift message {name/type/sequence-number} for return
	  // and then save the JSON object in rstack
	  var r = {};
	  r.fname = this.robj.shift();
	  r.mtype = this.robj.shift();
	  r.rseqid = this.robj.shift();
	  this.rstack.push(this.robj.shift());
	  return r;
	};

	/** Deserializes the end of a message. */
	TJSONProtocol.prototype.readMessageEnd = function() {
	};

	/**
	 * Deserializes the beginning of a struct.
	 * @param {string} [name] - The name of the struct (ignored)
	 * @returns {object} - An object with an empty string fname property
	 */
	TJSONProtocol.prototype.readStructBegin = function() {
	  var r = {};
	  r.fname = '';

	  //incase this is an array of structs
	  if (this.rstack[this.rstack.length - 1] instanceof Array) {
	    this.rstack.push(this.rstack[this.rstack.length - 1].shift());
	  }

	  return r;
	};

	/** Deserializes the end of a struct. */
	TJSONProtocol.prototype.readStructEnd = function() {
	  this.rstack.pop();
	};

	/**
	 * @class
	 * @name AnonReadFieldBeginReturn
	 * @property {string} fname - The name of the field (always '').
	 * @property {Thrift.Type} ftype - The data type of the field.
	 * @property {number} fid - The unique identifier of the field.
	 */
	/**
	 * Deserializes the beginning of a field.
	 * @returns {AnonReadFieldBeginReturn}
	 */
	TJSONProtocol.prototype.readFieldBegin = function() {
	  var r = {};

	  var fid = -1;
	  var ftype = Type.STOP;

	  //get a fieldId
	  for (var f in (this.rstack[this.rstack.length - 1])) {
	    if (f === null) {
	      continue;
	    }

	    fid = parseInt(f, 10);
	    this.rpos.push(this.rstack.length);

	    var field = this.rstack[this.rstack.length - 1][fid];

	    //remove so we don't see it again
	    delete this.rstack[this.rstack.length - 1][fid];

	    this.rstack.push(field);

	    break;
	  }

	  if (fid != -1) {
	    //should only be 1 of these but this is the only
	    //way to match a key
	    for (var i in (this.rstack[this.rstack.length - 1])) {
	      if (TJSONProtocol.RType[i] === null) {
	        continue;
	      }

	      ftype = TJSONProtocol.RType[i];
	      this.rstack[this.rstack.length - 1] = this.rstack[this.rstack.length - 1][i];
	    }
	  }

	  r.fname = '';
	  r.ftype = ftype;
	  r.fid = fid;

	  return r;
	};

	/** Deserializes the end of a field. */
	TJSONProtocol.prototype.readFieldEnd = function() {
	  var pos = this.rpos.pop();

	  //get back to the right place in the stack
	  while (this.rstack.length > pos) {
	    this.rstack.pop();
	  }
	};

	/**
	 * @class
	 * @name AnonReadMapBeginReturn
	 * @property {Thrift.Type} ktype - The data type of the key.
	 * @property {Thrift.Type} vtype - The data type of the value.
	 * @property {number} size - The number of elements in the map.
	 */
	/**
	 * Deserializes the beginning of a map.
	 * @returns {AnonReadMapBeginReturn}
	 */
	TJSONProtocol.prototype.readMapBegin = function() {
	  var map = this.rstack.pop();
	  var first = map.shift();
	  if (first instanceof Array) {
	    this.rstack.push(map);
	    map = first;
	    first = map.shift();
	  }

	  var r = {};
	  r.ktype = TJSONProtocol.RType[first];
	  r.vtype = TJSONProtocol.RType[map.shift()];
	  r.size = map.shift();


	  this.rpos.push(this.rstack.length);
	  this.rstack.push(map.shift());

	  return r;
	};

	/** Deserializes the end of a map. */
	TJSONProtocol.prototype.readMapEnd = function() {
	  this.readFieldEnd();
	};

	/**
	 * @class
	 * @name AnonReadColBeginReturn
	 * @property {Thrift.Type} etype - The data type of the element.
	 * @property {number} size - The number of elements in the collection.
	 */
	/**
	 * Deserializes the beginning of a list.
	 * @returns {AnonReadColBeginReturn}
	 */
	TJSONProtocol.prototype.readListBegin = function() {
	  var list = this.rstack[this.rstack.length - 1];

	  var r = {};
	  r.etype = TJSONProtocol.RType[list.shift()];
	  r.size = list.shift();

	  this.rpos.push(this.rstack.length);
	  this.rstack.push(list.shift());

	  return r;
	};

	/** Deserializes the end of a list. */
	TJSONProtocol.prototype.readListEnd = function() {
	  var pos = this.rpos.pop() - 2;
	  var st = this.rstack;
	  st.pop();
	  if (st instanceof Array && st.length > pos && st[pos].length > 0) {
	    st.push(st[pos].shift());
	  }
	};

	/**
	 * Deserializes the beginning of a set.
	 * @returns {AnonReadColBeginReturn}
	 */
	TJSONProtocol.prototype.readSetBegin = function() {
	  return this.readListBegin();
	};

	/** Deserializes the end of a set. */
	TJSONProtocol.prototype.readSetEnd = function() {
	  return this.readListEnd();
	};

	TJSONProtocol.prototype.readBool = function() {
	  return this.readValue() == '1';
	};

	TJSONProtocol.prototype.readByte = function() {
	  return this.readI32();
	};

	TJSONProtocol.prototype.readI16 = function() {
	  return this.readI32();
	};

	TJSONProtocol.prototype.readI32 = function(f) {
	  return +this.readValue();
	}

	/** Returns the next value found in the protocol buffer */
	TJSONProtocol.prototype.readValue = function(f) {
	  if (f === undefined) {
	    f = this.rstack[this.rstack.length - 1];
	  }

	  var r = {};

	  if (f instanceof Array) {
	    if (f.length === 0) {
	      r.value = undefined;
	    } else {
	      r.value = f.shift();
	    }
	  } else if (!(f instanceof Int64) && f instanceof Object) {
	    for (var i in f) {
	      if (i === null) {
	        continue;
	      }
	      this.rstack.push(f[i]);
	      delete f[i];

	      r.value = i;
	      break;
	    }
	  } else {
	    r.value = f;
	    this.rstack.pop();
	  }

	  return r.value;
	};

	TJSONProtocol.prototype.readI64 = function() {
	  var n = this.readValue()
	  if (typeof n === 'string') {
	    // Assuming no one is sending in 1.11111e+33 format
	    return Int64Util.fromDecimalString(n);
	  } else {
	    return new Int64(n);
	  }
	};

	TJSONProtocol.prototype.readDouble = function() {
	  return this.readI32();
	};

	TJSONProtocol.prototype.readBinary = function() {
	  return new Buffer(this.readValue(), 'base64');
	};

	TJSONProtocol.prototype.readString = function() {
	  return this.readValue();
	};

	/**
	 * Returns the underlying transport.
	 * @readonly
	 * @returns {Thrift.Transport} The underlying transport.
	 */
	TJSONProtocol.prototype.getTransport = function() {
	  return this.trans;
	};

	/**
	 * Method to arbitrarily skip over data
	 */
	TJSONProtocol.prototype.skip = function(type) {
	  throw new Error('skip not supported yet');
	};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */

	var Int64 = __webpack_require__(13);

	var Int64Util = module.exports = {};

	var POW2_24 = Math.pow(2, 24);
	var POW2_31 = Math.pow(2, 31);
	var POW2_32 = Math.pow(2, 32);
	var POW10_11 = Math.pow(10, 11);

	Int64Util.toDecimalString = function(i64) {
	  var b = i64.buffer;
	  var o = i64.offset;
	  if ((!b[o] && !(b[o + 1] & 0xe0)) ||
	      (!~b[o] && !~(b[o + 1] & 0xe0))) {
	    // The magnitude is small enough.
	    return i64.toString();
	  } else {
	    var negative = b[o] & 0x80;
	    if (negative) {
	      // 2's complement
	      var incremented = false;
	      var buffer = new Buffer(8);
	      for (var i = 7; i >= 0; --i) {
	        buffer[i] = (~b[o + i] + (incremented ? 0 : 1)) & 0xff;
	        incremented |= b[o + i];
	      }
	      b = buffer;
	    }
	    var high2 = b[o + 1] + (b[o] << 8);
	    // Lesser 11 digits with exceeding values but is under 53 bits capacity.
	    var low = b[o + 7] + (b[o + 6] << 8) + (b[o + 5] << 16)
	        + b[o + 4] * POW2_24  // Bit shift renders 32th bit as sign, so use multiplication
	        + (b[o + 3] + (b[o + 2] << 8)) * POW2_32 + high2 * 74976710656;  // The literal is 2^48 % 10^11
	    // 12th digit and greater.
	    var high = Math.floor(low / POW10_11) + high2 * 2814;  // The literal is 2^48 / 10^11
	    // Make it exactly 11 with leading zeros.
	    low = ('00000000000' + String(low % POW10_11)).slice(-11);
	    return (negative ? '-' : '') + String(high) + low;
	  }
	};

	Int64Util.fromDecimalString = function(text) {
	  var negative = text.charAt(0) === '-';
	  if (text.length < (negative ? 17 : 16)) {
	    // The magnitude is smaller than 2^53.
	    return new Int64(+text);
	  } else if (text.length > (negative ? 20 : 19)) {
	    throw new RangeError('Too many digits for Int64: ' + text);
	  } else {
	    // Most significant (up to 5) digits
	    var high5 = +text.slice(negative ? 1 : 0, -15);
	    var low = +text.slice(-15) + high5 * 2764472320;  // The literal is 10^15 % 2^32
	    var high = Math.floor(low / POW2_32) + high5 * 232830;  // The literal is 10^15 / 2^&32
	    low = low % POW2_32;
	    if (high >= POW2_31 &&
	        !(negative && high == POW2_31 && low == 0)  // Allow minimum Int64
	       ) {
	      throw new RangeError('The magnitude is too large for Int64.');
	    }
	    if (negative) {
	      // 2's complement
	      high = ~high;
	      if (low === 0) {
	        high = (high + 1) & 0xffffffff;
	      } else {
	        low = ~low + 1;
	      }
	      high = 0x80000000 | high;
	    }
	    return new Int64(high, low);
	  }
	};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Imported from Douglas Crockford's reference implementation with minimum modification
	 * to handle Int64.
	 *
	 * https://github.com/douglascrockford/JSON-js/blob/c98948ae1944a28e2e8ebc3717894e580aeaaa05/json_parse.js
	 *
	 * Original license header:
	 *
	 * json_parse.js
	 * 2015-05-02
	 * Public Domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */


	/*jslint for */

	/*property
	    at, b, call, charAt, f, fromCharCode, hasOwnProperty, message, n, name,
	    prototype, push, r, t, text
	*/

	var Int64 = __webpack_require__(13);
	var Int64Util = __webpack_require__(43);

	var json_parse = module.exports = (function () {
	    "use strict";

	// This is a function that can parse a JSON text, producing a JavaScript
	// data structure. It is a simple, recursive descent parser. It does not use
	// eval or regular expressions, so it can be used as a model for implementing
	// a JSON parser in other languages.

	// We are defining the function inside of another function to avoid creating
	// global variables.

	    var at,     // The index of the current character
	        ch,     // The current character
	        escapee = {
	            '"': '"',
	            '\\': '\\',
	            '/': '/',
	            b: '\b',
	            f: '\f',
	            n: '\n',
	            r: '\r',
	            t: '\t'
	        },
	        text,

	        error = function (m) {

	// Call error when something is wrong.

	            throw new SyntaxError(m);
	        },

	        next = function (c) {

	// If a c parameter is provided, verify that it matches the current character.

	            if (c && c !== ch) {
	                error("Expected '" + c + "' instead of '" + ch + "'");
	            }

	// Get the next character. When there are no more characters,
	// return the empty string.

	            ch = text.charAt(at);
	            at += 1;
	            return ch;
	        },

	        number = function () {

	// Parse a number value.

	            var number,
	                string = '';

	            if (ch === '-') {
	                string = '-';
	                next('-');
	            }
	            while (ch >= '0' && ch <= '9') {
	                string += ch;
	                next();
	            }
	            if (ch === '.') {
	                string += '.';
	                while (next() && ch >= '0' && ch <= '9') {
	                    string += ch;
	                }
	            }
	            if (ch === 'e' || ch === 'E') {
	                string += ch;
	                next();
	                if (ch === '-' || ch === '+') {
	                    string += ch;
	                    next();
	                }
	                while (ch >= '0' && ch <= '9') {
	                    string += ch;
	                    next();
	                }
	            }
	            number = +string;
	            if (!isFinite(number)) {
	                error("Bad number");
	            } else if (number >= Int64.MAX_INT || number <= Int64.MIN_INT) {
	                // Return raw string for further process in TJSONProtocol
	                return string;
	            } else {
	                return number;
	            }
	        },

	        string = function () {

	// Parse a string value.

	            var hex,
	                i,
	                string = '',
	                uffff;

	// When parsing for string values, we must look for " and \ characters.

	            if (ch === '"') {
	                while (next()) {
	                    if (ch === '"') {
	                        next();
	                        return string;
	                    }
	                    if (ch === '\\') {
	                        next();
	                        if (ch === 'u') {
	                            uffff = 0;
	                            for (i = 0; i < 4; i += 1) {
	                                hex = parseInt(next(), 16);
	                                if (!isFinite(hex)) {
	                                    break;
	                                }
	                                uffff = uffff * 16 + hex;
	                            }
	                            string += String.fromCharCode(uffff);
	                        } else if (typeof escapee[ch] === 'string') {
	                            string += escapee[ch];
	                        } else {
	                            break;
	                        }
	                    } else {
	                        string += ch;
	                    }
	                }
	            }
	            error("Bad string");
	        },

	        white = function () {

	// Skip whitespace.

	            while (ch && ch <= ' ') {
	                next();
	            }
	        },

	        word = function () {

	// true, false, or null.

	            switch (ch) {
	            case 't':
	                next('t');
	                next('r');
	                next('u');
	                next('e');
	                return true;
	            case 'f':
	                next('f');
	                next('a');
	                next('l');
	                next('s');
	                next('e');
	                return false;
	            case 'n':
	                next('n');
	                next('u');
	                next('l');
	                next('l');
	                return null;
	            }
	            error("Unexpected '" + ch + "'");
	        },

	        value,  // Place holder for the value function.

	        array = function () {

	// Parse an array value.

	            var array = [];

	            if (ch === '[') {
	                next('[');
	                white();
	                if (ch === ']') {
	                    next(']');
	                    return array;   // empty array
	                }
	                while (ch) {
	                    array.push(value());
	                    white();
	                    if (ch === ']') {
	                        next(']');
	                        return array;
	                    }
	                    next(',');
	                    white();
	                }
	            }
	            error("Bad array");
	        },

	        object = function () {

	// Parse an object value.

	            var key,
	                object = {};

	            if (ch === '{') {
	                next('{');
	                white();
	                if (ch === '}') {
	                    next('}');
	                    return object;   // empty object
	                }
	                while (ch) {
	                    key = string();
	                    white();
	                    next(':');
	                    if (Object.hasOwnProperty.call(object, key)) {
	                        error('Duplicate key "' + key + '"');
	                    }
	                    object[key] = value();
	                    white();
	                    if (ch === '}') {
	                        next('}');
	                        return object;
	                    }
	                    next(',');
	                    white();
	                }
	            }
	            error("Bad object");
	        };

	    value = function () {

	// Parse a JSON value. It could be an object, an array, a string, a number,
	// or a word.

	        white();
	        switch (ch) {
	        case '{':
	            return object();
	        case '[':
	            return array();
	        case '"':
	            return string();
	        case '-':
	            return number();
	        default:
	            return ch >= '0' && ch <= '9'
	                ? number()
	                : word();
	        }
	    };

	// Return the json_parse function. It will have access to all of the above
	// functions and variables.

	    return function (source) {
	        var result;

	        text = source;
	        at = 0;
	        ch = ' ';
	        result = value();
	        white();
	        if (ch) {
	            error("Syntax error");
	        }

	        return result;
	    };
	}());


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var util = __webpack_require__(3);
	var EventEmitter = __webpack_require__(5).EventEmitter;
	var thrift = __webpack_require__(2);

	var TBufferedTransport = __webpack_require__(8);
	var TJSONProtocol = __webpack_require__(42);
	var InputBufferUnderrunError = __webpack_require__(10);

	var createClient = __webpack_require__(14);

	exports.XHRConnection = XHRConnection;

	/**
	 * Constructor Function for the XHR Connection.
	 * If you do not specify a host and port then XHRConnection will default to the
	 * host and port of the page from which this javascript is served.
	 * @constructor
	 * @param {string} [url] - The URL to connect to.
	 * @classdesc TXHRConnection objects provide Thrift end point transport
	 *     semantics implemented using XHR.
	 * @example
	 *     var transport = new Thrift.TXHRConnection('localhost', 9099, {});
	 */
	function XHRConnection(host, port, options) {
	  this.options = options || {};
	  this.wpos = 0;
	  this.rpos = 0;
	  this.useCORS = (options && options.useCORS);
	  this.send_buf = '';
	  this.recv_buf = '';
	  this.transport = options.transport || TBufferedTransport;
	  this.protocol = options.protocol || TJSONProtocol;
	  this.headers = options.headers || {};

	  host = host || window.location.host;
	  port = port || window.location.port;
	  var prefix = options.https ? 'https://' : 'http://';
	  var path = options.path || '/';

	  if (port === '') {
	    port = undefined;
	  }

	  if (!port || port === 80 || port === '80') {
	    this.url = prefix + host + path;
	  } else {
	    this.url = prefix + host + ':' + port + path;
	  }

	  //The sequence map is used to map seqIDs back to the
	  //  calling client in multiplexed scenarios
	  this.seqId2Service = {};
	};

	util.inherits(XHRConnection, EventEmitter);

	/**
	* Gets the browser specific XmlHttpRequest Object.
	* @returns {object} the browser XHR interface object
	*/
	XHRConnection.prototype.getXmlHttpRequestObject = function() {
	  try { return new XMLHttpRequest(); } catch (e1) { }
	  try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch (e2) { }
	  try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e3) { }

	  throw "Your browser doesn't support XHR.";
	};

	/**
	 * Sends the current XRH request if the transport was created with a URL
	 * and the async parameter is false. If the transport was not created with
	 * a URL, or the async parameter is True and no callback is provided, or
	 * the URL is an empty string, the current send buffer is returned.
	 * @param {object} async - If true the current send buffer is returned.
	 * @param {object} callback - Optional async completion callback
	 * @returns {undefined|string} Nothing or the current send buffer.
	 * @throws {string} If XHR fails.
	 */
	XHRConnection.prototype.flush = function() {
	  var self = this;
	  if (this.url === undefined || this.url === '') {
	    return this.send_buf;
	  }

	  var xreq = this.getXmlHttpRequestObject();

	  if (xreq.overrideMimeType) {
	    xreq.overrideMimeType('application/json');
	  }

	  xreq.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      self.setRecvBuffer(this.responseText);
	    }
	  };

	  xreq.open('POST', this.url, true);

	  Object.keys(this.headers).forEach(function(headerKey) {
	    xreq.setRequestHeader(headerKey, self.headers[headerKey]);
	  });

	  xreq.send(this.send_buf);
	};

	/**
	 * Sets the buffer to provide the protocol when deserializing.
	 * @param {string} buf - The buffer to supply the protocol.
	 */
	XHRConnection.prototype.setRecvBuffer = function(buf) {
	  this.recv_buf = buf;
	  this.recv_buf_sz = this.recv_buf.length;
	  this.wpos = this.recv_buf.length;
	  this.rpos = 0;

	  if (Object.prototype.toString.call(buf) == "[object ArrayBuffer]") {
	    var data = new Uint8Array(buf);
	  }
	  var thing = new Buffer(data || buf);

	  this.transport.receiver(this.__decodeCallback.bind(this))(thing);

	};

	XHRConnection.prototype.__decodeCallback = function(transport_with_data) {
	  var proto = new this.protocol(transport_with_data);
	  try {
	    while (true) {
	      var header = proto.readMessageBegin();
	      var dummy_seqid = header.rseqid * -1;
	      var client = this.client;
	      //The Multiplexed Protocol stores a hash of seqid to service names
	      //  in seqId2Service. If the SeqId is found in the hash we need to
	      //  lookup the appropriate client for this call.
	      //  The client var is a single client object when not multiplexing,
	      //  when using multiplexing it is a service name keyed hash of client
	      //  objects.
	      //NOTE: The 2 way interdependencies between protocols, transports,
	      //  connections and clients in the Node.js implementation are irregular
	      //  and make the implementation difficult to extend and maintain. We
	      //  should bring this stuff inline with typical thrift I/O stack
	      //  operation soon.
	      //  --ra
	      var service_name = this.seqId2Service[header.rseqid];
	      if (service_name) {
	        client = this.client[service_name];
	        delete this.seqId2Service[header.rseqid];
	      }
	      /*jshint -W083 */
	      client._reqs[dummy_seqid] = function(err, success) {
	        transport_with_data.commitPosition();
	        var clientCallback = client._reqs[header.rseqid];
	        delete client._reqs[header.rseqid];
	        if (clientCallback) {
	          clientCallback(err, success);
	        }
	      };
	      /*jshint +W083 */
	      if (client['recv_' + header.fname]) {
	        client['recv_' + header.fname](proto, header.mtype, dummy_seqid);
	      } else {
	        delete client._reqs[dummy_seqid];
	        this.emit("error",
	          new thrift.TApplicationException(
	            thrift.TApplicationExceptionType.WRONG_METHOD_NAME,
	            "Received a response to an unknown RPC function"));
	      }
	    }
	  } catch (e) {
	    if (e instanceof InputBufferUnderrunError) {
	      transport_with_data.rollbackPosition();
	    } else {
	      throw e;
	    }
	  }
	};

	/**
	 * Returns true if the transport is open, XHR always returns true.
	 * @readonly
	 * @returns {boolean} Always True.
	 */
	XHRConnection.prototype.isOpen = function() {
	  return true;
	};

	/**
	 * Opens the transport connection, with XHR this is a nop.
	 */
	XHRConnection.prototype.open = function() {};

	/**
	 * Closes the transport connection, with XHR this is a nop.
	 */
	XHRConnection.prototype.close = function() {};

	/**
	 * Returns the specified number of characters from the response
	 * buffer.
	 * @param {number} len - The number of characters to return.
	 * @returns {string} Characters sent by the server.
	 */
	XHRConnection.prototype.read = function(len) {
	  var avail = this.wpos - this.rpos;

	  if (avail === 0) {
	    return '';
	  }

	  var give = len;

	  if (avail < len) {
	    give = avail;
	  }

	  var ret = this.read_buf.substr(this.rpos, give);
	  this.rpos += give;

	  //clear buf when complete?
	  return ret;
	};

	/**
	 * Returns the entire response buffer.
	 * @returns {string} Characters sent by the server.
	 */
	XHRConnection.prototype.readAll = function() {
	  return this.recv_buf;
	};

	/**
	 * Sets the send buffer to buf.
	 * @param {string} buf - The buffer to send.
	 */
	XHRConnection.prototype.write = function(buf) {
	  this.send_buf = buf;
	  this.flush();
	};

	/**
	 * Returns the send buffer.
	 * @readonly
	 * @returns {string} The send buffer.
	 */
	XHRConnection.prototype.getSendBuffer = function() {
	  return this.send_buf;
	};

	/**
	 * Creates a new TXHRTransport object, used by Thrift clients to connect
	 *    to Thrift HTTP based servers.
	 * @param {string} host - The host name or IP to connect to.
	 * @param {number} port - The TCP port to connect to.
	 * @param {XHRConnectOptions} options - The configuration options to use.
	 * @returns {XHRConnection} The connection object.
	 * @see {@link XHRConnectOptions}
	 */
	exports.createXHRConnection = function(host, port, options) {
	  return new XHRConnection(host, port, options);
	};

	exports.createXHRClient = createClient;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var net = __webpack_require__(6);
	var tls = __webpack_require__(7);

	var TBufferedTransport = __webpack_require__(8);
	var TBinaryProtocol = __webpack_require__(11);
	var InputBufferUnderrunError = __webpack_require__(10);

	/**
	 * Create a Thrift server which can serve one or multiple services.
	 * @param {object} processor - A normal or multiplexedProcessor (must
	 *                             be preconstructed with the desired handler).
	 * @param {ServerOptions} options - Optional additional server configuration.
	 * @returns {object} - The Apache Thrift Multiplex Server.
	 */
	exports.createMultiplexServer = function(processor, options) {
	  var transport = (options && options.transport) ? options.transport : TBufferedTransport;
	  var protocol = (options && options.protocol) ? options.protocol : TBinaryProtocol;

	  function serverImpl(stream) {
	    var self = this;
	    stream.on('error', function(err) {
	        self.emit('error', err);
	    });
	    stream.on('data', transport.receiver(function(transportWithData) {
	      var input = new protocol(transportWithData);
	      var output = new protocol(new transport(undefined, function(buf) {
	        try {
	            stream.write(buf);
	        } catch (err) {
	            self.emit('error', err);
	            stream.end();
	        }
	      }));

	      try {
	        do {
	          processor.process(input, output);
	          transportWithData.commitPosition();
	        } while (true);
	      } catch (err) {
	        if (err instanceof InputBufferUnderrunError) {
	          //The last data in the buffer was not a complete message, wait for the rest
	          transportWithData.rollbackPosition();
	        }
	        else if (err.message === "Invalid type: undefined") {
	          //No more data in the buffer
	          //This trap is a bit hackish
	          //The next step to improve the node behavior here is to have
	          //  the compiler generated process method throw a more explicit
	          //  error when the network buffer is empty (regardles of the
	          //  protocol/transport stack in use) and replace this heuristic.
	          //  Also transports should probably not force upper layers to
	          //  manage their buffer positions (i.e. rollbackPosition() and
	          //  commitPosition() should be eliminated in lieu of a transport
	          //  encapsulated buffer management strategy.)
	          transportWithData.rollbackPosition();
	        }
	        else {
	          //Unexpected error
	          self.emit('error', err);
	          stream.end();
	        }
	      }
	    }));

	    stream.on('end', function() {
	      stream.end();
	    });
	  }

	  if (options && options.tls) {
	    return tls.createServer(options.tls, serverImpl);
	  } else {
	    return net.createServer(serverImpl);
	  }
	};

	/**
	 * Create a single service Apache Thrift server.
	 * @param {object} processor - A service class or processor function.
	 * @param {ServerOptions} options - Optional additional server configuration.
	 * @returns {object} - The Apache Thrift Multiplex Server.
	 */
	exports.createServer = function(processor, handler, options) {
	  if (processor.Processor) {
	    processor = processor.Processor;
	  }
	  return exports.createMultiplexServer(new processor(handler), options);
	};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var http = __webpack_require__(17);
	var https = __webpack_require__(18);
	var url = __webpack_require__(23);
	var path = __webpack_require__(48);
	var fs = __webpack_require__(26);
	var crypto = __webpack_require__(22);

	var MultiplexedProcessor = __webpack_require__(49).MultiplexedProcessor;

	var TBufferedTransport = __webpack_require__(8);
	var TBinaryProtocol = __webpack_require__(11);
	var InputBufferUnderrunError = __webpack_require__(10);

	// WSFrame constructor and prototype
	/////////////////////////////////////////////////////////////////////

	/** Apache Thrift RPC Web Socket Transport
	 *  Frame layout conforming to RFC 6455 circa 12/2011
	 *
	 * Theoretical frame size limit is 4GB*4GB, however the Node Buffer
	 * limit is 1GB as of v0.10. The frame length encoding is also
	 * configured for a max of 4GB presently and needs to be adjusted
	 * if Node/Browsers become capabile of > 4GB frames.
	 *
	 *  - FIN is 1 if the message is complete
	 *  - RSV1/2/3 are always 0
	 *  - Opcode is 1(TEXT) for TJSONProtocol and 2(BIN) for TBinaryProtocol
	 *  - Mask Present bit is 1 sending to-server and 0 sending to-client
	 *  - Payload Len:
	 *        + If < 126: then represented directly
	 *        + If >=126: but within range of an unsigned 16 bit integer
	 *             then Payload Len is 126 and the two following bytes store
	 *             the length
	 *        + Else: Payload Len is 127 and the following 8 bytes store the
	 *             length as an unsigned 64 bit integer
	 *  - Masking key is a 32 bit key only present when sending to the server
	 *  - Payload follows the masking key or length
	 *
	 *     0                   1                   2                   3
	 *     0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
	 *    +-+-+-+-+-------+-+-------------+-------------------------------+
	 *    |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
	 *    |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
	 *    |N|V|V|V|       |S|             |   (if payload len==126/127)   |
	 *    | |1|2|3|       |K|             |                               |
	 *    +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
	 *    |     Extended payload length continued, if payload len == 127  |
	 *    + - - - - - - - - - - - - - - - +-------------------------------+
	 *    |                               |Masking-key, if MASK set to 1  |
	 *    +-------------------------------+-------------------------------+
	 *    | Masking-key (continued)       |          Payload Data         |
	 *    +-------------------------------- - - - - - - - - - - - - - - - +
	 *    :                     Payload Data continued ...                :
	 *    + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
	 *    |                     Payload Data continued ...                |
	 *    +---------------------------------------------------------------+
	 */
	var wsFrame = {
	  /** Encodes a WebSocket frame
	   *
	   * @param {Buffer} data - The raw data to encode
	   * @param {Buffer} mask - The mask to apply when sending to server, null for no mask
	   * @param {Boolean} binEncoding - True for binary encoding, false for text encoding
	   * @returns {Buffer} - The WebSocket frame, ready to send
	   */
	  encode: function(data, mask, binEncoding) {
	      var frame = new Buffer(wsFrame.frameSizeFromData(data, mask));
	      //Byte 0 - FIN & OPCODE
	      frame[0] = wsFrame.fin.FIN +
	          (binEncoding ? wsFrame.frameOpCodes.BIN : wsFrame.frameOpCodes.TEXT);
	      //Byte 1 or 1-3 or 1-9 - MASK FLAG & SIZE
	      var payloadOffset = 2;
	      if (data.length < 0x7E) {
	        frame[1] = data.length + (mask ? wsFrame.mask.TO_SERVER : wsFrame.mask.TO_CLIENT);
	      } else if (data.length < 0xFFFF) {
	        frame[1] = 0x7E + (mask ? wsFrame.mask.TO_SERVER : wsFrame.mask.TO_CLIENT);
	        frame.writeUInt16BE(data.length, 2, true);
	        payloadOffset = 4;
	      } else {
	        frame[1] = 0x7F + (mask ? wsFrame.mask.TO_SERVER : wsFrame.mask.TO_CLIENT);
	        frame.writeUInt32BE(0, 2, true);
	        frame.writeUInt32BE(data.length, 6, true);
	        payloadOffset = 10;
	      }
	      //MASK
	      if (mask) {
	        mask.copy(frame, payloadOffset, 0, 4);
	        payloadOffset += 4;
	      }
	      //Payload
	      data.copy(frame, payloadOffset);
	      if (mask) {
	        wsFrame.applyMask(frame.slice(payloadOffset), frame.slice(payloadOffset-4,payloadOffset));
	      }
	      return frame;
	  },

	  /**
	   * @class
	   * @name WSDecodeResult
	   * @property {Buffer} data - The decoded data for the first ATRPC message
	   * @property {Buffer} mask - The frame mask
	   * @property {Boolean} binEncoding - True if binary (TBinaryProtocol),
	   *                                   False if text (TJSONProtocol)
	   * @property {Buffer} nextFrame - Multiple ATRPC messages may be sent in a
	   *                                single WebSocket frame, this Buffer contains
	   *                                any bytes remaining to be decoded
	   * @property {Boolean} FIN - True is the message is complete
	   */

	   /** Decodes a WebSocket frame
	   *
	   * @param {Buffer} frame - The raw inbound frame, if this is a continuation
	   *                         frame it must have a mask property with the mask.
	   * @returns {WSDecodeResult} - The decoded payload
	   *
	   * @see {@link WSDecodeResult}
	   */
	  decode: function(frame) {
	      var result = {
	        data: null,
	        mask: null,
	        binEncoding: false,
	        nextFrame: null,
	        FIN: true
	      };

	      //Byte 0 - FIN & OPCODE
	      if (wsFrame.fin.FIN != (frame[0] & wsFrame.fin.FIN)) {
	        result.FIN = false;
	      }
	      result.binEncoding = (wsFrame.frameOpCodes.BIN == (frame[0] & wsFrame.frameOpCodes.BIN));
	      //Byte 1 or 1-3 or 1-9 - SIZE
	      var lenByte = (frame[1] & 0x0000007F);
	      var len = lenByte;
	      var dataOffset = 2;
	      if (lenByte == 0x7E) {
	        len = frame.readUInt16BE(2);
	        dataOffset = 4;
	      } else if (lenByte == 0x7F) {
	        len = frame.readUInt32BE(6);
	        dataOffset = 10;
	      }
	      //MASK
	      if (wsFrame.mask.TO_SERVER == (frame[1] & wsFrame.mask.TO_SERVER)) {
	        result.mask = new Buffer(4);
	        frame.copy(result.mask, 0, dataOffset, dataOffset + 4);
	        dataOffset += 4;
	      }
	      //Payload
	      result.data = new Buffer(len);
	      frame.copy(result.data, 0, dataOffset, dataOffset+len);
	      if (result.mask) {
	        wsFrame.applyMask(result.data, result.mask);
	      }
	      //Next Frame
	      if (frame.length > dataOffset+len) {
	        result.nextFrame = new Buffer(frame.length - (dataOffset+len));
	        frame.copy(result.nextFrame, 0, dataOffset+len, frame.length);
	      }
	      //Don't forward control frames
	      if (frame[0] & wsFrame.frameOpCodes.FINCTRL) {
	        result.data = null;
	      }

	      return result;
	  },

	  /** Masks/Unmasks data
	   *
	   * @param {Buffer} data - data to mask/unmask in place
	   * @param {Buffer} mask - the mask
	   */
	  applyMask: function(data, mask){
	    //TODO: look into xoring words at a time
	    var dataLen = data.length;
	    var maskLen = mask.length;
	    for (var i = 0; i < dataLen; i++) {
	      data[i] = data[i] ^ mask[i%maskLen];
	    }
	  },

	  /** Computes frame size on the wire from data to be sent
	   *
	   * @param {Buffer} data - data.length is the assumed payload size
	   * @param {Boolean} mask - true if a mask will be sent (TO_SERVER)
	   */
	  frameSizeFromData: function(data, mask) {
	    var headerSize = 10;
	    if (data.length < 0x7E) {
	      headerSize = 2;
	    } else if (data.length < 0xFFFF) {
	      headerSize = 4;
	    }
	    return headerSize + data.length + (mask ? 4 : 0);
	  },

	  frameOpCodes: {
	    CONT:     0x00,
	    TEXT:     0x01,
	    BIN:      0x02,
	    CTRL:     0x80
	  },

	  mask: {
	    TO_SERVER: 0x80,
	    TO_CLIENT: 0x00
	  },

	  fin: {
	    CONT: 0x00,
	    FIN: 0x80
	  }
	};


	// createWebServer constructor and options
	/////////////////////////////////////////////////////////////////////

	/**
	 * @class
	 * @name ServerOptions
	 * @property {array} cors - Array of CORS origin strings to permit requests from.
	 * @property {string} files - Path to serve static files from, if absent or ""
	 *                               static file service is disabled.
	 * @property {object} headers - An object hash mapping header strings to header value
	 *                              strings, these headers are transmitted in response to
	 *                              static file GET operations.
	 * @property {object} services - An object hash mapping service URI strings
	 *                               to ServiceOptions objects
	 * @property {object} tls - Node.js TLS options (see: nodejs.org/api/tls.html),
	 *                          if not present or null regular http is used,
	 *                          at least a key and a cert must be defined to use SSL/TLS
	 * @see {@link ServiceOptions}
	 */

	/**
	 * @class
	 * @name ServiceOptions
	 * @property {object} transport - The layered transport to use (defaults
	 *                                to TBufferedTransport).
	 * @property {object} protocol - The serialization Protocol to use (defaults to
	 *                               TBinaryProtocol).
	 * @property {object} processor - The Thrift Service class/processor generated
	 *                                by the IDL Compiler for the service (the "cls"
	 *                                key can also be used for this attribute).
	 * @property {object} handler - The handler methods for the Thrift Service.
	 */

	/**
	 * Create a Thrift server which can serve static files and/or one or
	 * more Thrift Services.
	 * @param {ServerOptions} options - The server configuration.
	 * @returns {object} - The Apache Thrift Web Server.
	 */
	exports.createWebServer = function(options) {
	  var baseDir = options.files;
	  var contentTypesByExtension = {
	    '.txt': 'text/plain',
	    '.html': 'text/html',
	    '.css': 'text/css',
	    '.xml': 'application/xml',
	    '.json': 'application/json',
	    '.js': 'application/javascript',
	    '.jpg': 'image/jpeg',
	    '.jpeg': 'image/jpeg',
	    '.gif': 'image/gif',
	    '.png': 'image/png',
	    '.svg': 'image/svg+xml'
	  };

	  //Setup all of the services
	  var services = options.services;
	  for (var uri in services) {
	    var svcObj = services[uri];

	    //Setup the processor
	    if (svcObj.processor instanceof MultiplexedProcessor) {
	      //Multiplex processors have pre embedded processor/handler pairs, save as is
	      svcObj.processor = svcObj.processor;
	    } else {
	      //For historical reasons Node.js supports processors passed in directly or via the
	      //  IDL Compiler generated class housing the processor. Also, the options property
	      //  for a Processor has been called both cls and processor at different times. We
	      //  support any of the four possibilities here.
	      var processor = (svcObj.processor) ? (svcObj.processor.Processor || svcObj.processor) :
	                                           (svcObj.cls.Processor || svcObj.cls);
	      //Processors can be supplied as constructed objects with handlers already embedded,
	      //  if a handler is provided we construct a new processor, if not we use the processor
	      //  object directly
	      if (svcObj.handler) {
	        svcObj.processor = new processor(svcObj.handler);
	      } else {
	        svcObj.processor = processor;
	      }
	    }
	    svcObj.transport = svcObj.transport ? svcObj.transport : TBufferedTransport;
	    svcObj.protocol = svcObj.protocol ? svcObj.protocol : TBinaryProtocol;
	  }

	  //Verify CORS requirements
	  function VerifyCORSAndSetHeaders(request, response) {
	    if (request.headers.origin && options.cors) {
	      if (options.cors["*"] || options.cors[request.headers.origin]) {
	        //Allow, origin allowed
	        response.setHeader("access-control-allow-origin", request.headers.origin);
	        response.setHeader("access-control-allow-methods", "GET, POST, OPTIONS");
	        response.setHeader("access-control-allow-headers", "content-type, accept");
	        response.setHeader("access-control-max-age", "60");
	        return true;
	      } else {
	        //Disallow, origin denied
	        return false;
	      }
	    }
	    //Allow, CORS is not in use
	    return true;
	  }


	  //Handle OPTIONS method (CORS)
	  ///////////////////////////////////////////////////
	  function processOptions(request, response) {
	    if (VerifyCORSAndSetHeaders(request, response)) {
	      response.writeHead("204", "No Content", {"content-length": 0});
	    } else {
	      response.writeHead("403", "Origin " + request.headers.origin + " not allowed", {});
	    }
	    response.end();
	  }


	  //Handle POST methods (TXHRTransport)
	  ///////////////////////////////////////////////////
	  function processPost(request, response) {
	    //Lookup service
	    var uri = url.parse(request.url).pathname;
	    var svc = services[uri];
	    if (!svc) {
	      response.writeHead("403", "No Apache Thrift Service at " + uri, {});
	      response.end();
	      return;
	    }

	    //Verify CORS requirements
	    if (!VerifyCORSAndSetHeaders(request, response)) {
	      response.writeHead("403", "Origin " + request.headers.origin + " not allowed", {});
	      response.end();
	      return;
	    }

	    //Process XHR payload
	    request.on('data', svc.transport.receiver(function(transportWithData) {
	      var input = new svc.protocol(transportWithData);
	      var output = new svc.protocol(new svc.transport(undefined, function(buf) {
	        try {
	          response.writeHead(200);
	          response.end(buf);
	        } catch (err) {
	          response.writeHead(500);
	          response.end();
	        }
	      }));

	      try {
	        svc.processor.process(input, output);
	        transportWithData.commitPosition();
	      } catch (err) {
	        if (err instanceof InputBufferUnderrunError) {
	          transportWithData.rollbackPosition();
	        } else {
	          response.writeHead(500);
	          response.end();
	        }
	      }
	    }));
	  }


	  //Handle GET methods (Static Page Server)
	  ///////////////////////////////////////////////////
	  function processGet(request, response) {
	    //Undefined or empty base directory means do not serve static files
	    if (!baseDir || "" === baseDir) {
	      response.writeHead(404);
	      response.end();
	      return;
	    }

	    //Verify CORS requirements
	    if (!VerifyCORSAndSetHeaders(request, response)) {
	      response.writeHead("403", "Origin " + request.headers.origin + " not allowed", {});
	      response.end();
	      return;
	    }

	    //Locate the file requested and send it
	    var uri = url.parse(request.url).pathname;
	    var filename = path.join(baseDir, uri);
	    fs.exists(filename, function(exists) {
	      if(!exists) {
	        response.writeHead(404);
	        response.end();
	        return;
	      }

	      if (fs.statSync(filename).isDirectory()) {
	        filename += '/index.html';
	      }

	      fs.readFile(filename, "binary", function(err, file) {
	        if (err) {
	          response.writeHead(500);
	          response.end(err + "\n");
	          return;
	        }
	        var headers = {};
	        var contentType = contentTypesByExtension[path.extname(filename)];
	        if (contentType) {
	          headers["Content-Type"] = contentType;
	        }
	        for (var k in options.headers) {
	          headers[k] = options.headers[k];
	        }
	        response.writeHead(200, headers);
	        response.write(file, "binary");
	        response.end();
	      });
	    });
	  }


	  //Handle WebSocket calls (TWebSocketTransport)
	  ///////////////////////////////////////////////////
	  function processWS(data, socket, svc, binEncoding) {
	    svc.transport.receiver(function(transportWithData) {
	      var input = new svc.protocol(transportWithData);
	      var output = new svc.protocol(new svc.transport(undefined, function(buf) {
	        try {
	          var frame = wsFrame.encode(buf, null, binEncoding);
	          socket.write(frame);
	        } catch (err) {
	          //TODO: Add better error processing
	        }
	      }));

	      try {
	        svc.processor.process(input, output);
	        transportWithData.commitPosition();
	      }
	      catch (err) {
	        if (err instanceof InputBufferUnderrunError) {
	          transportWithData.rollbackPosition();
	        }
	        else {
	          //TODO: Add better error processing
	        }
	      }
	    })(data);
	  }

	  //Create the server (HTTP or HTTPS)
	  var server = null;
	  if (options.tls) {
	    server = https.createServer(options.tls);
	  } else {
	    server = http.createServer();
	  }

	  //Wire up listeners for upgrade(to WebSocket) & request methods for:
	  //   - GET static files,
	  //   - POST XHR Thrift services
	  //   - OPTIONS CORS requests
	  server.on('request', function(request, response) {
	    if (request.method === 'POST') {
	      processPost(request, response);
	    } else if (request.method === 'GET') {
	      processGet(request, response);
	    } else if (request.method === 'OPTIONS') {
	      processOptions(request, response);
	    } else {
	      response.writeHead(500);
	      response.end();
	    }
	  }).on('upgrade', function(request, socket, head) {
	    //Lookup service
	    var svc;
	    try {
	      svc = services[Object.keys(services)[0]];
	    } catch(e) {
	      socket.write("HTTP/1.1 403 No Apache Thrift Service available\r\n\r\n");
	      return;
	    }
	    //Perform upgrade
	    var hash = crypto.createHash("sha1");
	    hash.update(request.headers['sec-websocket-key'] + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
	    socket.write("HTTP/1.1 101 Switching Protocols\r\n" +
	                   "Upgrade: websocket\r\n" +
	                   "Connection: Upgrade\r\n" +
	                   "Sec-WebSocket-Accept: " + hash.digest("base64") + "\r\n" +
	                   "Sec-WebSocket-Origin: " + request.headers.origin + "\r\n" +
	                   "Sec-WebSocket-Location: ws://" + request.headers.host + request.url + "\r\n" +
	                   "\r\n");
	    //Handle WebSocket traffic
	    var data = null;
	    socket.on('data', function(frame) {
	      try {
	        while (frame) {
	          var result = wsFrame.decode(frame);
	          //Prepend any existing decoded data
	          if (data) {
	            if (result.data) {
	              var newData = new Buffer(data.length + result.data.length);
	              data.copy(newData);
	              result.data.copy(newData, data.length);
	              result.data = newData;
	            } else {
	              result.data = data;
	            }
	            data = null;
	          }
	          //If this completes a message process it
	          if (result.FIN) {
	            processWS(result.data, socket, svc, result.binEncoding);
	          } else {
	            data = result.data;
	          }
	          //Prepare next frame for decoding (if any)
	          frame = result.nextFrame;
	        }
	      } catch(e) {
	        console.log("TWebSocketTransport Exception: " + e);
	        socket.destroy();
	      }
	    });
	  });

	  //Return the server
	  return server;
	};








/***/ }),
/* 48 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var Thrift = __webpack_require__(2);

	exports.MultiplexedProcessor = MultiplexedProcessor;

	function MultiplexedProcessor(stream, options) {
	  this.services = {};
	};

	MultiplexedProcessor.prototype.registerProcessor = function(name, handler) {
	  this.services[name] = handler;
	};

	MultiplexedProcessor.prototype.process = function(inp, out) {
	  var begin = inp.readMessageBegin();

	  if (begin.mtype != Thrift.MessageType.CALL && begin.mtype != Thrift.MessageType.ONEWAY) {
	    throw new Thrift.TException('TMultiplexedProcessor: Unexpected message type');
	  }

	  var p = begin.fname.split(':');
	  var sname = p[0];
	  var fname = p[1];

	  if (! (sname in this.services)) {
	    throw new Thrift.TException('TMultiplexedProcessor: Unknown service: ' + sname);
	  }

	  //construct a proxy object which stubs the readMessageBegin
	  //for the service
	  var inpProxy = {};

	  for (var attr in inp) {
	    inpProxy[attr] = inp[attr];
	  }

	  inpProxy.readMessageBegin = function() {
	    return {
	      fname: fname,
	      mtype: begin.mtype,
	      rseqid: begin.rseqid
	    };
	  };

	  this.services[sname].process(inpProxy, out);
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// vim:ts=4:sts=4:sw=4:
	/*!
	 *
	 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
	 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
	 *
	 * With parts by Tyler Close
	 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
	 * at http://www.opensource.org/licenses/mit-license.html
	 * Forked at ref_send.js version: 2009-05-11
	 *
	 * With parts by Mark Miller
	 * Copyright (C) 2011 Google Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	(function (definition) {
	    // Turn off strict mode for this function so we can assign to global.Q
	    /* jshint strict: false */

	    // This file will function properly as a <script> tag, or a module
	    // using CommonJS and NodeJS or RequireJS module formats.  In
	    // Common/Node/RequireJS, the module exports the Q API and when
	    // executed as a simple <script>, it creates a Q global instead.

	    // Montage Require
	    if (typeof bootstrap === "function") {
	        bootstrap("promise", definition);

	    // CommonJS
	    } else if (true) {
	        module.exports = definition();

	    // RequireJS
	    } else if (typeof define === "function" && define.amd) {
	        define(definition);

	    // SES (Secure EcmaScript)
	    } else if (typeof ses !== "undefined") {
	        if (!ses.ok()) {
	            return;
	        } else {
	            ses.makeQ = definition;
	        }

	    // <script>
	    } else {
	        Q = definition();
	    }

	})(function () {
	"use strict";

	var hasStacks = false;
	try {
	    throw new Error();
	} catch (e) {
	    hasStacks = !!e.stack;
	}

	// All code after this point will be filtered from stack traces reported
	// by Q.
	var qStartingLine = captureLine();
	var qFileName;

	// shims

	// used for fallback in "allResolved"
	var noop = function () {};

	// Use the fastest possible means to execute a task in a future turn
	// of the event loop.
	var nextTick =(function () {
	    // linked list of tasks (single, with head node)
	    var head = {task: void 0, next: null};
	    var tail = head;
	    var flushing = false;
	    var requestTick = void 0;
	    var isNodeJS = false;

	    function flush() {
	        /* jshint loopfunc: true */

	        while (head.next) {
	            head = head.next;
	            var task = head.task;
	            head.task = void 0;
	            var domain = head.domain;

	            if (domain) {
	                head.domain = void 0;
	                domain.enter();
	            }

	            try {
	                task();

	            } catch (e) {
	                if (isNodeJS) {
	                    // In node, uncaught exceptions are considered fatal errors.
	                    // Re-throw them synchronously to interrupt flushing!

	                    // Ensure continuation if the uncaught exception is suppressed
	                    // listening "uncaughtException" events (as domains does).
	                    // Continue in next event to avoid tick recursion.
	                    if (domain) {
	                        domain.exit();
	                    }
	                    setTimeout(flush, 0);
	                    if (domain) {
	                        domain.enter();
	                    }

	                    throw e;

	                } else {
	                    // In browsers, uncaught exceptions are not fatal.
	                    // Re-throw them asynchronously to avoid slow-downs.
	                    setTimeout(function() {
	                       throw e;
	                    }, 0);
	                }
	            }

	            if (domain) {
	                domain.exit();
	            }
	        }

	        flushing = false;
	    }

	    nextTick = function (task) {
	        tail = tail.next = {
	            task: task,
	            domain: isNodeJS && process.domain,
	            next: null
	        };

	        if (!flushing) {
	            flushing = true;
	            requestTick();
	        }
	    };

	    if (typeof process !== "undefined" && process.nextTick) {
	        // Node.js before 0.9. Note that some fake-Node environments, like the
	        // Mocha test runner, introduce a `process` global without a `nextTick`.
	        isNodeJS = true;

	        requestTick = function () {
	            process.nextTick(flush);
	        };

	    } else if (typeof setImmediate === "function") {
	        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
	        if (typeof window !== "undefined") {
	            requestTick = setImmediate.bind(window, flush);
	        } else {
	            requestTick = function () {
	                setImmediate(flush);
	            };
	        }

	    } else if (typeof MessageChannel !== "undefined") {
	        // modern browsers
	        // http://www.nonblocking.io/2011/06/windownexttick.html
	        var channel = new MessageChannel();
	        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
	        // working message ports the first time a page loads.
	        channel.port1.onmessage = function () {
	            requestTick = requestPortTick;
	            channel.port1.onmessage = flush;
	            flush();
	        };
	        var requestPortTick = function () {
	            // Opera requires us to provide a message payload, regardless of
	            // whether we use it.
	            channel.port2.postMessage(0);
	        };
	        requestTick = function () {
	            setTimeout(flush, 0);
	            requestPortTick();
	        };

	    } else {
	        // old browsers
	        requestTick = function () {
	            setTimeout(flush, 0);
	        };
	    }

	    return nextTick;
	})();

	// Attempt to make generics safe in the face of downstream
	// modifications.
	// There is no situation where this is necessary.
	// If you need a security guarantee, these primordials need to be
	// deeply frozen anyway, and if you don’t need a security guarantee,
	// this is just plain paranoid.
	// However, this **might** have the nice side-effect of reducing the size of
	// the minified code by reducing x.call() to merely x()
	// See Mark Miller’s explanation of what this does.
	// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
	var call = Function.call;
	function uncurryThis(f) {
	    return function () {
	        return call.apply(f, arguments);
	    };
	}
	// This is equivalent, but slower:
	// uncurryThis = Function_bind.bind(Function_bind.call);
	// http://jsperf.com/uncurrythis

	var array_slice = uncurryThis(Array.prototype.slice);

	var array_reduce = uncurryThis(
	    Array.prototype.reduce || function (callback, basis) {
	        var index = 0,
	            length = this.length;
	        // concerning the initial value, if one is not provided
	        if (arguments.length === 1) {
	            // seek to the first value in the array, accounting
	            // for the possibility that is is a sparse array
	            do {
	                if (index in this) {
	                    basis = this[index++];
	                    break;
	                }
	                if (++index >= length) {
	                    throw new TypeError();
	                }
	            } while (1);
	        }
	        // reduce
	        for (; index < length; index++) {
	            // account for the possibility that the array is sparse
	            if (index in this) {
	                basis = callback(basis, this[index], index);
	            }
	        }
	        return basis;
	    }
	);

	var array_indexOf = uncurryThis(
	    Array.prototype.indexOf || function (value) {
	        // not a very good shim, but good enough for our one use of it
	        for (var i = 0; i < this.length; i++) {
	            if (this[i] === value) {
	                return i;
	            }
	        }
	        return -1;
	    }
	);

	var array_map = uncurryThis(
	    Array.prototype.map || function (callback, thisp) {
	        var self = this;
	        var collect = [];
	        array_reduce(self, function (undefined, value, index) {
	            collect.push(callback.call(thisp, value, index, self));
	        }, void 0);
	        return collect;
	    }
	);

	var object_create = Object.create || function (prototype) {
	    function Type() { }
	    Type.prototype = prototype;
	    return new Type();
	};

	var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

	var object_keys = Object.keys || function (object) {
	    var keys = [];
	    for (var key in object) {
	        if (object_hasOwnProperty(object, key)) {
	            keys.push(key);
	        }
	    }
	    return keys;
	};

	var object_toString = uncurryThis(Object.prototype.toString);

	function isObject(value) {
	    return value === Object(value);
	}

	// generator related shims

	// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
	function isStopIteration(exception) {
	    return (
	        object_toString(exception) === "[object StopIteration]" ||
	        exception instanceof QReturnValue
	    );
	}

	// FIXME: Remove this helper and Q.return once ES6 generators are in
	// SpiderMonkey.
	var QReturnValue;
	if (typeof ReturnValue !== "undefined") {
	    QReturnValue = ReturnValue;
	} else {
	    QReturnValue = function (value) {
	        this.value = value;
	    };
	}

	// long stack traces

	var STACK_JUMP_SEPARATOR = "From previous event:";

	function makeStackTraceLong(error, promise) {
	    // If possible, transform the error stack trace by removing Node and Q
	    // cruft, then concatenating with the stack trace of `promise`. See #57.
	    if (hasStacks &&
	        promise.stack &&
	        typeof error === "object" &&
	        error !== null &&
	        error.stack &&
	        error.stack.indexOf(STACK_JUMP_SEPARATOR) === -1
	    ) {
	        var stacks = [];
	        for (var p = promise; !!p; p = p.source) {
	            if (p.stack) {
	                stacks.unshift(p.stack);
	            }
	        }
	        stacks.unshift(error.stack);

	        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
	        error.stack = filterStackString(concatedStacks);
	    }
	}

	function filterStackString(stackString) {
	    var lines = stackString.split("\n");
	    var desiredLines = [];
	    for (var i = 0; i < lines.length; ++i) {
	        var line = lines[i];

	        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
	            desiredLines.push(line);
	        }
	    }
	    return desiredLines.join("\n");
	}

	function isNodeFrame(stackLine) {
	    return stackLine.indexOf("(module.js:") !== -1 ||
	           stackLine.indexOf("(node.js:") !== -1;
	}

	function getFileNameAndLineNumber(stackLine) {
	    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
	    // In IE10 function name can have spaces ("Anonymous function") O_o
	    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
	    if (attempt1) {
	        return [attempt1[1], Number(attempt1[2])];
	    }

	    // Anonymous functions: "at filename:lineNumber:columnNumber"
	    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
	    if (attempt2) {
	        return [attempt2[1], Number(attempt2[2])];
	    }

	    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
	    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
	    if (attempt3) {
	        return [attempt3[1], Number(attempt3[2])];
	    }
	}

	function isInternalFrame(stackLine) {
	    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

	    if (!fileNameAndLineNumber) {
	        return false;
	    }

	    var fileName = fileNameAndLineNumber[0];
	    var lineNumber = fileNameAndLineNumber[1];

	    return fileName === qFileName &&
	        lineNumber >= qStartingLine &&
	        lineNumber <= qEndingLine;
	}

	// discover own file name and line number range for filtering stack
	// traces
	function captureLine() {
	    if (!hasStacks) {
	        return;
	    }

	    try {
	        throw new Error();
	    } catch (e) {
	        var lines = e.stack.split("\n");
	        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
	        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
	        if (!fileNameAndLineNumber) {
	            return;
	        }

	        qFileName = fileNameAndLineNumber[0];
	        return fileNameAndLineNumber[1];
	    }
	}

	function deprecate(callback, name, alternative) {
	    return function () {
	        if (typeof console !== "undefined" &&
	            typeof console.warn === "function") {
	            console.warn(name + " is deprecated, use " + alternative +
	                         " instead.", new Error("").stack);
	        }
	        return callback.apply(callback, arguments);
	    };
	}

	// end of shims
	// beginning of real work

	/**
	 * Constructs a promise for an immediate reference, passes promises through, or
	 * coerces promises from different systems.
	 * @param value immediate reference or promise
	 */
	function Q(value) {
	    // If the object is already a Promise, return it directly.  This enables
	    // the resolve function to both be used to created references from objects,
	    // but to tolerably coerce non-promises to promises.
	    if (isPromise(value)) {
	        return value;
	    }

	    // assimilate thenables
	    if (isPromiseAlike(value)) {
	        return coerce(value);
	    } else {
	        return fulfill(value);
	    }
	}
	Q.resolve = Q;

	/**
	 * Performs a task in a future turn of the event loop.
	 * @param {Function} task
	 */
	Q.nextTick = nextTick;

	/**
	 * Controls whether or not long stack traces will be on
	 */
	Q.longStackSupport = false;

	/**
	 * Constructs a {promise, resolve, reject} object.
	 *
	 * `resolve` is a callback to invoke with a more resolved value for the
	 * promise. To fulfill the promise, invoke `resolve` with any value that is
	 * not a thenable. To reject the promise, invoke `resolve` with a rejected
	 * thenable, or invoke `reject` with the reason directly. To resolve the
	 * promise to another thenable, thus putting it in the same state, invoke
	 * `resolve` with that other thenable.
	 */
	Q.defer = defer;
	function defer() {
	    // if "messages" is an "Array", that indicates that the promise has not yet
	    // been resolved.  If it is "undefined", it has been resolved.  Each
	    // element of the messages array is itself an array of complete arguments to
	    // forward to the resolved promise.  We coerce the resolution value to a
	    // promise using the `resolve` function because it handles both fully
	    // non-thenable values and other thenables gracefully.
	    var messages = [], progressListeners = [], resolvedPromise;

	    var deferred = object_create(defer.prototype);
	    var promise = object_create(Promise.prototype);

	    promise.promiseDispatch = function (resolve, op, operands) {
	        var args = array_slice(arguments);
	        if (messages) {
	            messages.push(args);
	            if (op === "when" && operands[1]) { // progress operand
	                progressListeners.push(operands[1]);
	            }
	        } else {
	            nextTick(function () {
	                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
	            });
	        }
	    };

	    // XXX deprecated
	    promise.valueOf = function () {
	        if (messages) {
	            return promise;
	        }
	        var nearerValue = nearer(resolvedPromise);
	        if (isPromise(nearerValue)) {
	            resolvedPromise = nearerValue; // shorten chain
	        }
	        return nearerValue;
	    };

	    promise.inspect = function () {
	        if (!resolvedPromise) {
	            return { state: "pending" };
	        }
	        return resolvedPromise.inspect();
	    };

	    if (Q.longStackSupport && hasStacks) {
	        try {
	            throw new Error();
	        } catch (e) {
	            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
	            // accessor around; that causes memory leaks as per GH-111. Just
	            // reify the stack trace as a string ASAP.
	            //
	            // At the same time, cut off the first line; it's always just
	            // "[object Promise]\n", as per the `toString`.
	            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
	        }
	    }

	    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
	    // consolidating them into `become`, since otherwise we'd create new
	    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

	    function become(newPromise) {
	        resolvedPromise = newPromise;
	        promise.source = newPromise;

	        array_reduce(messages, function (undefined, message) {
	            nextTick(function () {
	                newPromise.promiseDispatch.apply(newPromise, message);
	            });
	        }, void 0);

	        messages = void 0;
	        progressListeners = void 0;
	    }

	    deferred.promise = promise;
	    deferred.resolve = function (value) {
	        if (resolvedPromise) {
	            return;
	        }

	        become(Q(value));
	    };

	    deferred.fulfill = function (value) {
	        if (resolvedPromise) {
	            return;
	        }

	        become(fulfill(value));
	    };
	    deferred.reject = function (reason) {
	        if (resolvedPromise) {
	            return;
	        }

	        become(reject(reason));
	    };
	    deferred.notify = function (progress) {
	        if (resolvedPromise) {
	            return;
	        }

	        array_reduce(progressListeners, function (undefined, progressListener) {
	            nextTick(function () {
	                progressListener(progress);
	            });
	        }, void 0);
	    };

	    return deferred;
	}

	/**
	 * Creates a Node-style callback that will resolve or reject the deferred
	 * promise.
	 * @returns a nodeback
	 */
	defer.prototype.makeNodeResolver = function () {
	    var self = this;
	    return function (error, value) {
	        if (error) {
	            self.reject(error);
	        } else if (arguments.length > 2) {
	            self.resolve(array_slice(arguments, 1));
	        } else {
	            self.resolve(value);
	        }
	    };
	};

	/**
	 * @param resolver {Function} a function that returns nothing and accepts
	 * the resolve, reject, and notify functions for a deferred.
	 * @returns a promise that may be resolved with the given resolve and reject
	 * functions, or rejected by a thrown exception in resolver
	 */
	Q.Promise = promise; // ES6
	Q.promise = promise;
	function promise(resolver) {
	    if (typeof resolver !== "function") {
	        throw new TypeError("resolver must be a function.");
	    }
	    var deferred = defer();
	    try {
	        resolver(deferred.resolve, deferred.reject, deferred.notify);
	    } catch (reason) {
	        deferred.reject(reason);
	    }
	    return deferred.promise;
	}

	promise.race = race; // ES6
	promise.all = all; // ES6
	promise.reject = reject; // ES6
	promise.resolve = Q; // ES6

	// XXX experimental.  This method is a way to denote that a local value is
	// serializable and should be immediately dispatched to a remote upon request,
	// instead of passing a reference.
	Q.passByCopy = function (object) {
	    //freeze(object);
	    //passByCopies.set(object, true);
	    return object;
	};

	Promise.prototype.passByCopy = function () {
	    //freeze(object);
	    //passByCopies.set(object, true);
	    return this;
	};

	/**
	 * If two promises eventually fulfill to the same value, promises that value,
	 * but otherwise rejects.
	 * @param x {Any*}
	 * @param y {Any*}
	 * @returns {Any*} a promise for x and y if they are the same, but a rejection
	 * otherwise.
	 *
	 */
	Q.join = function (x, y) {
	    return Q(x).join(y);
	};

	Promise.prototype.join = function (that) {
	    return Q([this, that]).spread(function (x, y) {
	        if (x === y) {
	            // TODO: "===" should be Object.is or equiv
	            return x;
	        } else {
	            throw new Error("Can't join: not the same: " + x + " " + y);
	        }
	    });
	};

	/**
	 * Returns a promise for the first of an array of promises to become fulfilled.
	 * @param answers {Array[Any*]} promises to race
	 * @returns {Any*} the first promise to be fulfilled
	 */
	Q.race = race;
	function race(answerPs) {
	    return promise(function(resolve, reject) {
	        // Switch to this once we can assume at least ES5
	        // answerPs.forEach(function(answerP) {
	        //     Q(answerP).then(resolve, reject);
	        // });
	        // Use this in the meantime
	        for (var i = 0, len = answerPs.length; i < len; i++) {
	            Q(answerPs[i]).then(resolve, reject);
	        }
	    });
	}

	Promise.prototype.race = function () {
	    return this.then(Q.race);
	};

	/**
	 * Constructs a Promise with a promise descriptor object and optional fallback
	 * function.  The descriptor contains methods like when(rejected), get(name),
	 * set(name, value), post(name, args), and delete(name), which all
	 * return either a value, a promise for a value, or a rejection.  The fallback
	 * accepts the operation name, a resolver, and any further arguments that would
	 * have been forwarded to the appropriate method above had a method been
	 * provided with the proper name.  The API makes no guarantees about the nature
	 * of the returned object, apart from that it is usable whereever promises are
	 * bought and sold.
	 */
	Q.makePromise = Promise;
	function Promise(descriptor, fallback, inspect) {
	    if (fallback === void 0) {
	        fallback = function (op) {
	            return reject(new Error(
	                "Promise does not support operation: " + op
	            ));
	        };
	    }
	    if (inspect === void 0) {
	        inspect = function () {
	            return {state: "unknown"};
	        };
	    }

	    var promise = object_create(Promise.prototype);

	    promise.promiseDispatch = function (resolve, op, args) {
	        var result;
	        try {
	            if (descriptor[op]) {
	                result = descriptor[op].apply(promise, args);
	            } else {
	                result = fallback.call(promise, op, args);
	            }
	        } catch (exception) {
	            result = reject(exception);
	        }
	        if (resolve) {
	            resolve(result);
	        }
	    };

	    promise.inspect = inspect;

	    // XXX deprecated `valueOf` and `exception` support
	    if (inspect) {
	        var inspected = inspect();
	        if (inspected.state === "rejected") {
	            promise.exception = inspected.reason;
	        }

	        promise.valueOf = function () {
	            var inspected = inspect();
	            if (inspected.state === "pending" ||
	                inspected.state === "rejected") {
	                return promise;
	            }
	            return inspected.value;
	        };
	    }

	    return promise;
	}

	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};

	Promise.prototype.then = function (fulfilled, rejected, progressed) {
	    var self = this;
	    var deferred = defer();
	    var done = false;   // ensure the untrusted promise makes at most a
	                        // single call to one of the callbacks

	    function _fulfilled(value) {
	        try {
	            return typeof fulfilled === "function" ? fulfilled(value) : value;
	        } catch (exception) {
	            return reject(exception);
	        }
	    }

	    function _rejected(exception) {
	        if (typeof rejected === "function") {
	            makeStackTraceLong(exception, self);
	            try {
	                return rejected(exception);
	            } catch (newException) {
	                return reject(newException);
	            }
	        }
	        return reject(exception);
	    }

	    function _progressed(value) {
	        return typeof progressed === "function" ? progressed(value) : value;
	    }

	    nextTick(function () {
	        self.promiseDispatch(function (value) {
	            if (done) {
	                return;
	            }
	            done = true;

	            deferred.resolve(_fulfilled(value));
	        }, "when", [function (exception) {
	            if (done) {
	                return;
	            }
	            done = true;

	            deferred.resolve(_rejected(exception));
	        }]);
	    });

	    // Progress propagator need to be attached in the current tick.
	    self.promiseDispatch(void 0, "when", [void 0, function (value) {
	        var newValue;
	        var threw = false;
	        try {
	            newValue = _progressed(value);
	        } catch (e) {
	            threw = true;
	            if (Q.onerror) {
	                Q.onerror(e);
	            } else {
	                throw e;
	            }
	        }

	        if (!threw) {
	            deferred.notify(newValue);
	        }
	    }]);

	    return deferred.promise;
	};

	/**
	 * Registers an observer on a promise.
	 *
	 * Guarantees:
	 *
	 * 1. that fulfilled and rejected will be called only once.
	 * 2. that either the fulfilled callback or the rejected callback will be
	 *    called, but not both.
	 * 3. that fulfilled and rejected will not be called in this turn.
	 *
	 * @param value      promise or immediate reference to observe
	 * @param fulfilled  function to be called with the fulfilled value
	 * @param rejected   function to be called with the rejection exception
	 * @param progressed function to be called on any progress notifications
	 * @return promise for the return value from the invoked callback
	 */
	Q.when = when;
	function when(value, fulfilled, rejected, progressed) {
	    return Q(value).then(fulfilled, rejected, progressed);
	}

	Promise.prototype.thenResolve = function (value) {
	    return this.then(function () { return value; });
	};

	Q.thenResolve = function (promise, value) {
	    return Q(promise).thenResolve(value);
	};

	Promise.prototype.thenReject = function (reason) {
	    return this.then(function () { throw reason; });
	};

	Q.thenReject = function (promise, reason) {
	    return Q(promise).thenReject(reason);
	};

	/**
	 * If an object is not a promise, it is as "near" as possible.
	 * If a promise is rejected, it is as "near" as possible too.
	 * If it’s a fulfilled promise, the fulfillment value is nearer.
	 * If it’s a deferred promise and the deferred has been resolved, the
	 * resolution is "nearer".
	 * @param object
	 * @returns most resolved (nearest) form of the object
	 */

	// XXX should we re-do this?
	Q.nearer = nearer;
	function nearer(value) {
	    if (isPromise(value)) {
	        var inspected = value.inspect();
	        if (inspected.state === "fulfilled") {
	            return inspected.value;
	        }
	    }
	    return value;
	}

	/**
	 * @returns whether the given object is a promise.
	 * Otherwise it is a fulfilled value.
	 */
	Q.isPromise = isPromise;
	function isPromise(object) {
	    return isObject(object) &&
	        typeof object.promiseDispatch === "function" &&
	        typeof object.inspect === "function";
	}

	Q.isPromiseAlike = isPromiseAlike;
	function isPromiseAlike(object) {
	    return isObject(object) && typeof object.then === "function";
	}

	/**
	 * @returns whether the given object is a pending promise, meaning not
	 * fulfilled or rejected.
	 */
	Q.isPending = isPending;
	function isPending(object) {
	    return isPromise(object) && object.inspect().state === "pending";
	}

	Promise.prototype.isPending = function () {
	    return this.inspect().state === "pending";
	};

	/**
	 * @returns whether the given object is a value or fulfilled
	 * promise.
	 */
	Q.isFulfilled = isFulfilled;
	function isFulfilled(object) {
	    return !isPromise(object) || object.inspect().state === "fulfilled";
	}

	Promise.prototype.isFulfilled = function () {
	    return this.inspect().state === "fulfilled";
	};

	/**
	 * @returns whether the given object is a rejected promise.
	 */
	Q.isRejected = isRejected;
	function isRejected(object) {
	    return isPromise(object) && object.inspect().state === "rejected";
	}

	Promise.prototype.isRejected = function () {
	    return this.inspect().state === "rejected";
	};

	//// BEGIN UNHANDLED REJECTION TRACKING

	// This promise library consumes exceptions thrown in handlers so they can be
	// handled by a subsequent promise.  The exceptions get added to this array when
	// they are created, and removed when they are handled.  Note that in ES6 or
	// shimmed environments, this would naturally be a `Set`.
	var unhandledReasons = [];
	var unhandledRejections = [];
	var trackUnhandledRejections = true;

	function resetUnhandledRejections() {
	    unhandledReasons.length = 0;
	    unhandledRejections.length = 0;

	    if (!trackUnhandledRejections) {
	        trackUnhandledRejections = true;
	    }
	}

	function trackRejection(promise, reason) {
	    if (!trackUnhandledRejections) {
	        return;
	    }

	    unhandledRejections.push(promise);
	    if (reason && typeof reason.stack !== "undefined") {
	        unhandledReasons.push(reason.stack);
	    } else {
	        unhandledReasons.push("(no stack) " + reason);
	    }
	}

	function untrackRejection(promise) {
	    if (!trackUnhandledRejections) {
	        return;
	    }

	    var at = array_indexOf(unhandledRejections, promise);
	    if (at !== -1) {
	        unhandledRejections.splice(at, 1);
	        unhandledReasons.splice(at, 1);
	    }
	}

	Q.resetUnhandledRejections = resetUnhandledRejections;

	Q.getUnhandledReasons = function () {
	    // Make a copy so that consumers can't interfere with our internal state.
	    return unhandledReasons.slice();
	};

	Q.stopUnhandledRejectionTracking = function () {
	    resetUnhandledRejections();
	    trackUnhandledRejections = false;
	};

	resetUnhandledRejections();

	//// END UNHANDLED REJECTION TRACKING

	/**
	 * Constructs a rejected promise.
	 * @param reason value describing the failure
	 */
	Q.reject = reject;
	function reject(reason) {
	    var rejection = Promise({
	        "when": function (rejected) {
	            // note that the error has been handled
	            if (rejected) {
	                untrackRejection(this);
	            }
	            return rejected ? rejected(reason) : this;
	        }
	    }, function fallback() {
	        return this;
	    }, function inspect() {
	        return { state: "rejected", reason: reason };
	    });

	    // Note that the reason has not been handled.
	    trackRejection(rejection, reason);

	    return rejection;
	}

	/**
	 * Constructs a fulfilled promise for an immediate reference.
	 * @param value immediate reference
	 */
	Q.fulfill = fulfill;
	function fulfill(value) {
	    return Promise({
	        "when": function () {
	            return value;
	        },
	        "get": function (name) {
	            return value[name];
	        },
	        "set": function (name, rhs) {
	            value[name] = rhs;
	        },
	        "delete": function (name) {
	            delete value[name];
	        },
	        "post": function (name, args) {
	            // Mark Miller proposes that post with no name should apply a
	            // promised function.
	            if (name === null || name === void 0) {
	                return value.apply(void 0, args);
	            } else {
	                return value[name].apply(value, args);
	            }
	        },
	        "apply": function (thisp, args) {
	            return value.apply(thisp, args);
	        },
	        "keys": function () {
	            return object_keys(value);
	        }
	    }, void 0, function inspect() {
	        return { state: "fulfilled", value: value };
	    });
	}

	/**
	 * Converts thenables to Q promises.
	 * @param promise thenable promise
	 * @returns a Q promise
	 */
	function coerce(promise) {
	    var deferred = defer();
	    nextTick(function () {
	        try {
	            promise.then(deferred.resolve, deferred.reject, deferred.notify);
	        } catch (exception) {
	            deferred.reject(exception);
	        }
	    });
	    return deferred.promise;
	}

	/**
	 * Annotates an object such that it will never be
	 * transferred away from this process over any promise
	 * communication channel.
	 * @param object
	 * @returns promise a wrapping of that object that
	 * additionally responds to the "isDef" message
	 * without a rejection.
	 */
	Q.master = master;
	function master(object) {
	    return Promise({
	        "isDef": function () {}
	    }, function fallback(op, args) {
	        return dispatch(object, op, args);
	    }, function () {
	        return Q(object).inspect();
	    });
	}

	/**
	 * Spreads the values of a promised array of arguments into the
	 * fulfillment callback.
	 * @param fulfilled callback that receives variadic arguments from the
	 * promised array
	 * @param rejected callback that receives the exception if the promise
	 * is rejected.
	 * @returns a promise for the return value or thrown exception of
	 * either callback.
	 */
	Q.spread = spread;
	function spread(value, fulfilled, rejected) {
	    return Q(value).spread(fulfilled, rejected);
	}

	Promise.prototype.spread = function (fulfilled, rejected) {
	    return this.all().then(function (array) {
	        return fulfilled.apply(void 0, array);
	    }, rejected);
	};

	/**
	 * The async function is a decorator for generator functions, turning
	 * them into asynchronous generators.  Although generators are only part
	 * of the newest ECMAScript 6 drafts, this code does not cause syntax
	 * errors in older engines.  This code should continue to work and will
	 * in fact improve over time as the language improves.
	 *
	 * ES6 generators are currently part of V8 version 3.19 with the
	 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
	 * for longer, but under an older Python-inspired form.  This function
	 * works on both kinds of generators.
	 *
	 * Decorates a generator function such that:
	 *  - it may yield promises
	 *  - execution will continue when that promise is fulfilled
	 *  - the value of the yield expression will be the fulfilled value
	 *  - it returns a promise for the return value (when the generator
	 *    stops iterating)
	 *  - the decorated function returns a promise for the return value
	 *    of the generator or the first rejected promise among those
	 *    yielded.
	 *  - if an error is thrown in the generator, it propagates through
	 *    every following yield until it is caught, or until it escapes
	 *    the generator function altogether, and is translated into a
	 *    rejection for the promise returned by the decorated generator.
	 */
	Q.async = async;
	function async(makeGenerator) {
	    return function () {
	        // when verb is "send", arg is a value
	        // when verb is "throw", arg is an exception
	        function continuer(verb, arg) {
	            var result;

	            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
	            // engine that has a deployed base of browsers that support generators.
	            // However, SM's generators use the Python-inspired semantics of
	            // outdated ES6 drafts.  We would like to support ES6, but we'd also
	            // like to make it possible to use generators in deployed browsers, so
	            // we also support Python-style generators.  At some point we can remove
	            // this block.

	            if (typeof StopIteration === "undefined") {
	                // ES6 Generators
	                try {
	                    result = generator[verb](arg);
	                } catch (exception) {
	                    return reject(exception);
	                }
	                if (result.done) {
	                    return result.value;
	                } else {
	                    return when(result.value, callback, errback);
	                }
	            } else {
	                // SpiderMonkey Generators
	                // FIXME: Remove this case when SM does ES6 generators.
	                try {
	                    result = generator[verb](arg);
	                } catch (exception) {
	                    if (isStopIteration(exception)) {
	                        return exception.value;
	                    } else {
	                        return reject(exception);
	                    }
	                }
	                return when(result, callback, errback);
	            }
	        }
	        var generator = makeGenerator.apply(this, arguments);
	        var callback = continuer.bind(continuer, "next");
	        var errback = continuer.bind(continuer, "throw");
	        return callback();
	    };
	}

	/**
	 * The spawn function is a small wrapper around async that immediately
	 * calls the generator and also ends the promise chain, so that any
	 * unhandled errors are thrown instead of forwarded to the error
	 * handler. This is useful because it's extremely common to run
	 * generators at the top-level to work with libraries.
	 */
	Q.spawn = spawn;
	function spawn(makeGenerator) {
	    Q.done(Q.async(makeGenerator)());
	}

	// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
	/**
	 * Throws a ReturnValue exception to stop an asynchronous generator.
	 *
	 * This interface is a stop-gap measure to support generator return
	 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
	 * generators like Chromium 29, just use "return" in your generator
	 * functions.
	 *
	 * @param value the return value for the surrounding generator
	 * @throws ReturnValue exception with the value.
	 * @example
	 * // ES6 style
	 * Q.async(function* () {
	 *      var foo = yield getFooPromise();
	 *      var bar = yield getBarPromise();
	 *      return foo + bar;
	 * })
	 * // Older SpiderMonkey style
	 * Q.async(function () {
	 *      var foo = yield getFooPromise();
	 *      var bar = yield getBarPromise();
	 *      Q.return(foo + bar);
	 * })
	 */
	Q["return"] = _return;
	function _return(value) {
	    throw new QReturnValue(value);
	}

	/**
	 * The promised function decorator ensures that any promise arguments
	 * are settled and passed as values (`this` is also settled and passed
	 * as a value).  It will also ensure that the result of a function is
	 * always a promise.
	 *
	 * @example
	 * var add = Q.promised(function (a, b) {
	 *     return a + b;
	 * });
	 * add(Q(a), Q(B));
	 *
	 * @param {function} callback The function to decorate
	 * @returns {function} a function that has been decorated.
	 */
	Q.promised = promised;
	function promised(callback) {
	    return function () {
	        return spread([this, all(arguments)], function (self, args) {
	            return callback.apply(self, args);
	        });
	    };
	}

	/**
	 * sends a message to a value in a future turn
	 * @param object* the recipient
	 * @param op the name of the message operation, e.g., "when",
	 * @param args further arguments to be forwarded to the operation
	 * @returns result {Promise} a promise for the result of the operation
	 */
	Q.dispatch = dispatch;
	function dispatch(object, op, args) {
	    return Q(object).dispatch(op, args);
	}

	Promise.prototype.dispatch = function (op, args) {
	    var self = this;
	    var deferred = defer();
	    nextTick(function () {
	        self.promiseDispatch(deferred.resolve, op, args);
	    });
	    return deferred.promise;
	};

	/**
	 * Gets the value of a property in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of property to get
	 * @return promise for the property value
	 */
	Q.get = function (object, key) {
	    return Q(object).dispatch("get", [key]);
	};

	Promise.prototype.get = function (key) {
	    return this.dispatch("get", [key]);
	};

	/**
	 * Sets the value of a property in a future turn.
	 * @param object    promise or immediate reference for object object
	 * @param name      name of property to set
	 * @param value     new value of property
	 * @return promise for the return value
	 */
	Q.set = function (object, key, value) {
	    return Q(object).dispatch("set", [key, value]);
	};

	Promise.prototype.set = function (key, value) {
	    return this.dispatch("set", [key, value]);
	};

	/**
	 * Deletes a property in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of property to delete
	 * @return promise for the return value
	 */
	Q.del = // XXX legacy
	Q["delete"] = function (object, key) {
	    return Q(object).dispatch("delete", [key]);
	};

	Promise.prototype.del = // XXX legacy
	Promise.prototype["delete"] = function (key) {
	    return this.dispatch("delete", [key]);
	};

	/**
	 * Invokes a method in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of method to invoke
	 * @param value     a value to post, typically an array of
	 *                  invocation arguments for promises that
	 *                  are ultimately backed with `resolve` values,
	 *                  as opposed to those backed with URLs
	 *                  wherein the posted value can be any
	 *                  JSON serializable object.
	 * @return promise for the return value
	 */
	// bound locally because it is used by other methods
	Q.mapply = // XXX As proposed by "Redsandro"
	Q.post = function (object, name, args) {
	    return Q(object).dispatch("post", [name, args]);
	};

	Promise.prototype.mapply = // XXX As proposed by "Redsandro"
	Promise.prototype.post = function (name, args) {
	    return this.dispatch("post", [name, args]);
	};

	/**
	 * Invokes a method in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @param name      name of method to invoke
	 * @param ...args   array of invocation arguments
	 * @return promise for the return value
	 */
	Q.send = // XXX Mark Miller's proposed parlance
	Q.mcall = // XXX As proposed by "Redsandro"
	Q.invoke = function (object, name /*...args*/) {
	    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
	};

	Promise.prototype.send = // XXX Mark Miller's proposed parlance
	Promise.prototype.mcall = // XXX As proposed by "Redsandro"
	Promise.prototype.invoke = function (name /*...args*/) {
	    return this.dispatch("post", [name, array_slice(arguments, 1)]);
	};

	/**
	 * Applies the promised function in a future turn.
	 * @param object    promise or immediate reference for target function
	 * @param args      array of application arguments
	 */
	Q.fapply = function (object, args) {
	    return Q(object).dispatch("apply", [void 0, args]);
	};

	Promise.prototype.fapply = function (args) {
	    return this.dispatch("apply", [void 0, args]);
	};

	/**
	 * Calls the promised function in a future turn.
	 * @param object    promise or immediate reference for target function
	 * @param ...args   array of application arguments
	 */
	Q["try"] =
	Q.fcall = function (object /* ...args*/) {
	    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
	};

	Promise.prototype.fcall = function (/*...args*/) {
	    return this.dispatch("apply", [void 0, array_slice(arguments)]);
	};

	/**
	 * Binds the promised function, transforming return values into a fulfilled
	 * promise and thrown errors into a rejected one.
	 * @param object    promise or immediate reference for target function
	 * @param ...args   array of application arguments
	 */
	Q.fbind = function (object /*...args*/) {
	    var promise = Q(object);
	    var args = array_slice(arguments, 1);
	    return function fbound() {
	        return promise.dispatch("apply", [
	            this,
	            args.concat(array_slice(arguments))
	        ]);
	    };
	};
	Promise.prototype.fbind = function (/*...args*/) {
	    var promise = this;
	    var args = array_slice(arguments);
	    return function fbound() {
	        return promise.dispatch("apply", [
	            this,
	            args.concat(array_slice(arguments))
	        ]);
	    };
	};

	/**
	 * Requests the names of the owned properties of a promised
	 * object in a future turn.
	 * @param object    promise or immediate reference for target object
	 * @return promise for the keys of the eventually settled object
	 */
	Q.keys = function (object) {
	    return Q(object).dispatch("keys", []);
	};

	Promise.prototype.keys = function () {
	    return this.dispatch("keys", []);
	};

	/**
	 * Turns an array of promises into a promise for an array.  If any of
	 * the promises gets rejected, the whole array is rejected immediately.
	 * @param {Array*} an array (or promise for an array) of values (or
	 * promises for values)
	 * @returns a promise for an array of the corresponding values
	 */
	// By Mark Miller
	// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
	Q.all = all;
	function all(promises) {
	    return when(promises, function (promises) {
	        var countDown = 0;
	        var deferred = defer();
	        array_reduce(promises, function (undefined, promise, index) {
	            var snapshot;
	            if (
	                isPromise(promise) &&
	                (snapshot = promise.inspect()).state === "fulfilled"
	            ) {
	                promises[index] = snapshot.value;
	            } else {
	                ++countDown;
	                when(
	                    promise,
	                    function (value) {
	                        promises[index] = value;
	                        if (--countDown === 0) {
	                            deferred.resolve(promises);
	                        }
	                    },
	                    deferred.reject,
	                    function (progress) {
	                        deferred.notify({ index: index, value: progress });
	                    }
	                );
	            }
	        }, void 0);
	        if (countDown === 0) {
	            deferred.resolve(promises);
	        }
	        return deferred.promise;
	    });
	}

	Promise.prototype.all = function () {
	    return all(this);
	};

	/**
	 * Waits for all promises to be settled, either fulfilled or
	 * rejected.  This is distinct from `all` since that would stop
	 * waiting at the first rejection.  The promise returned by
	 * `allResolved` will never be rejected.
	 * @param promises a promise for an array (or an array) of promises
	 * (or values)
	 * @return a promise for an array of promises
	 */
	Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
	function allResolved(promises) {
	    return when(promises, function (promises) {
	        promises = array_map(promises, Q);
	        return when(all(array_map(promises, function (promise) {
	            return when(promise, noop, noop);
	        })), function () {
	            return promises;
	        });
	    });
	}

	Promise.prototype.allResolved = function () {
	    return allResolved(this);
	};

	/**
	 * @see Promise#allSettled
	 */
	Q.allSettled = allSettled;
	function allSettled(promises) {
	    return Q(promises).allSettled();
	}

	/**
	 * Turns an array of promises into a promise for an array of their states (as
	 * returned by `inspect`) when they have all settled.
	 * @param {Array[Any*]} values an array (or promise for an array) of values (or
	 * promises for values)
	 * @returns {Array[State]} an array of states for the respective values.
	 */
	Promise.prototype.allSettled = function () {
	    return this.then(function (promises) {
	        return all(array_map(promises, function (promise) {
	            promise = Q(promise);
	            function regardless() {
	                return promise.inspect();
	            }
	            return promise.then(regardless, regardless);
	        }));
	    });
	};

	/**
	 * Captures the failure of a promise, giving an oportunity to recover
	 * with a callback.  If the given promise is fulfilled, the returned
	 * promise is fulfilled.
	 * @param {Any*} promise for something
	 * @param {Function} callback to fulfill the returned promise if the
	 * given promise is rejected
	 * @returns a promise for the return value of the callback
	 */
	Q.fail = // XXX legacy
	Q["catch"] = function (object, rejected) {
	    return Q(object).then(void 0, rejected);
	};

	Promise.prototype.fail = // XXX legacy
	Promise.prototype["catch"] = function (rejected) {
	    return this.then(void 0, rejected);
	};

	/**
	 * Attaches a listener that can respond to progress notifications from a
	 * promise's originating deferred. This listener receives the exact arguments
	 * passed to ``deferred.notify``.
	 * @param {Any*} promise for something
	 * @param {Function} callback to receive any progress notifications
	 * @returns the given promise, unchanged
	 */
	Q.progress = progress;
	function progress(object, progressed) {
	    return Q(object).then(void 0, void 0, progressed);
	}

	Promise.prototype.progress = function (progressed) {
	    return this.then(void 0, void 0, progressed);
	};

	/**
	 * Provides an opportunity to observe the settling of a promise,
	 * regardless of whether the promise is fulfilled or rejected.  Forwards
	 * the resolution to the returned promise when the callback is done.
	 * The callback can return a promise to defer completion.
	 * @param {Any*} promise
	 * @param {Function} callback to observe the resolution of the given
	 * promise, takes no arguments.
	 * @returns a promise for the resolution of the given promise when
	 * ``fin`` is done.
	 */
	Q.fin = // XXX legacy
	Q["finally"] = function (object, callback) {
	    return Q(object)["finally"](callback);
	};

	Promise.prototype.fin = // XXX legacy
	Promise.prototype["finally"] = function (callback) {
	    callback = Q(callback);
	    return this.then(function (value) {
	        return callback.fcall().then(function () {
	            return value;
	        });
	    }, function (reason) {
	        // TODO attempt to recycle the rejection with "this".
	        return callback.fcall().then(function () {
	            throw reason;
	        });
	    });
	};

	/**
	 * Terminates a chain of promises, forcing rejections to be
	 * thrown as exceptions.
	 * @param {Any*} promise at the end of a chain of promises
	 * @returns nothing
	 */
	Q.done = function (object, fulfilled, rejected, progress) {
	    return Q(object).done(fulfilled, rejected, progress);
	};

	Promise.prototype.done = function (fulfilled, rejected, progress) {
	    var onUnhandledError = function (error) {
	        // forward to a future turn so that ``when``
	        // does not catch it and turn it into a rejection.
	        nextTick(function () {
	            makeStackTraceLong(error, promise);
	            if (Q.onerror) {
	                Q.onerror(error);
	            } else {
	                throw error;
	            }
	        });
	    };

	    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
	    var promise = fulfilled || rejected || progress ?
	        this.then(fulfilled, rejected, progress) :
	        this;

	    if (typeof process === "object" && process && process.domain) {
	        onUnhandledError = process.domain.bind(onUnhandledError);
	    }

	    promise.then(void 0, onUnhandledError);
	};

	/**
	 * Causes a promise to be rejected if it does not get fulfilled before
	 * some milliseconds time out.
	 * @param {Any*} promise
	 * @param {Number} milliseconds timeout
	 * @param {String} custom error message (optional)
	 * @returns a promise for the resolution of the given promise if it is
	 * fulfilled before the timeout, otherwise rejected.
	 */
	Q.timeout = function (object, ms, message) {
	    return Q(object).timeout(ms, message);
	};

	Promise.prototype.timeout = function (ms, message) {
	    var deferred = defer();
	    var timeoutId = setTimeout(function () {
	        deferred.reject(new Error(message || "Timed out after " + ms + " ms"));
	    }, ms);

	    this.then(function (value) {
	        clearTimeout(timeoutId);
	        deferred.resolve(value);
	    }, function (exception) {
	        clearTimeout(timeoutId);
	        deferred.reject(exception);
	    }, deferred.notify);

	    return deferred.promise;
	};

	/**
	 * Returns a promise for the given value (or promised value), some
	 * milliseconds after it resolved. Passes rejections immediately.
	 * @param {Any*} promise
	 * @param {Number} milliseconds
	 * @returns a promise for the resolution of the given promise after milliseconds
	 * time has elapsed since the resolution of the given promise.
	 * If the given promise rejects, that is passed immediately.
	 */
	Q.delay = function (object, timeout) {
	    if (timeout === void 0) {
	        timeout = object;
	        object = void 0;
	    }
	    return Q(object).delay(timeout);
	};

	Promise.prototype.delay = function (timeout) {
	    return this.then(function (value) {
	        var deferred = defer();
	        setTimeout(function () {
	            deferred.resolve(value);
	        }, timeout);
	        return deferred.promise;
	    });
	};

	/**
	 * Passes a continuation to a Node function, which is called with the given
	 * arguments provided as an array, and returns a promise.
	 *
	 *      Q.nfapply(FS.readFile, [__filename])
	 *      .then(function (content) {
	 *      })
	 *
	 */
	Q.nfapply = function (callback, args) {
	    return Q(callback).nfapply(args);
	};

	Promise.prototype.nfapply = function (args) {
	    var deferred = defer();
	    var nodeArgs = array_slice(args);
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.fapply(nodeArgs).fail(deferred.reject);
	    return deferred.promise;
	};

	/**
	 * Passes a continuation to a Node function, which is called with the given
	 * arguments provided individually, and returns a promise.
	 * @example
	 * Q.nfcall(FS.readFile, __filename)
	 * .then(function (content) {
	 * })
	 *
	 */
	Q.nfcall = function (callback /*...args*/) {
	    var args = array_slice(arguments, 1);
	    return Q(callback).nfapply(args);
	};

	Promise.prototype.nfcall = function (/*...args*/) {
	    var nodeArgs = array_slice(arguments);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.fapply(nodeArgs).fail(deferred.reject);
	    return deferred.promise;
	};

	/**
	 * Wraps a NodeJS continuation passing function and returns an equivalent
	 * version that returns a promise.
	 * @example
	 * Q.nfbind(FS.readFile, __filename)("utf-8")
	 * .then(console.log)
	 * .done()
	 */
	Q.nfbind =
	Q.denodeify = function (callback /*...args*/) {
	    var baseArgs = array_slice(arguments, 1);
	    return function () {
	        var nodeArgs = baseArgs.concat(array_slice(arguments));
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        Q(callback).fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };
	};

	Promise.prototype.nfbind =
	Promise.prototype.denodeify = function (/*...args*/) {
	    var args = array_slice(arguments);
	    args.unshift(this);
	    return Q.denodeify.apply(void 0, args);
	};

	Q.nbind = function (callback, thisp /*...args*/) {
	    var baseArgs = array_slice(arguments, 2);
	    return function () {
	        var nodeArgs = baseArgs.concat(array_slice(arguments));
	        var deferred = defer();
	        nodeArgs.push(deferred.makeNodeResolver());
	        function bound() {
	            return callback.apply(thisp, arguments);
	        }
	        Q(bound).fapply(nodeArgs).fail(deferred.reject);
	        return deferred.promise;
	    };
	};

	Promise.prototype.nbind = function (/*thisp, ...args*/) {
	    var args = array_slice(arguments, 0);
	    args.unshift(this);
	    return Q.nbind.apply(void 0, args);
	};

	/**
	 * Calls a method of a Node-style object that accepts a Node-style
	 * callback with a given array of arguments, plus a provided callback.
	 * @param object an object that has the named method
	 * @param {String} name name of the method of object
	 * @param {Array} args arguments to pass to the method; the callback
	 * will be provided by Q and appended to these arguments.
	 * @returns a promise for the value or error
	 */
	Q.nmapply = // XXX As proposed by "Redsandro"
	Q.npost = function (object, name, args) {
	    return Q(object).npost(name, args);
	};

	Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
	Promise.prototype.npost = function (name, args) {
	    var nodeArgs = array_slice(args || []);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};

	/**
	 * Calls a method of a Node-style object that accepts a Node-style
	 * callback, forwarding the given variadic arguments, plus a provided
	 * callback argument.
	 * @param object an object that has the named method
	 * @param {String} name name of the method of object
	 * @param ...args arguments to pass to the method; the callback will
	 * be provided by Q and appended to these arguments.
	 * @returns a promise for the value or error
	 */
	Q.nsend = // XXX Based on Mark Miller's proposed "send"
	Q.nmcall = // XXX Based on "Redsandro's" proposal
	Q.ninvoke = function (object, name /*...args*/) {
	    var nodeArgs = array_slice(arguments, 2);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};

	Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
	Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
	Promise.prototype.ninvoke = function (name /*...args*/) {
	    var nodeArgs = array_slice(arguments, 1);
	    var deferred = defer();
	    nodeArgs.push(deferred.makeNodeResolver());
	    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
	    return deferred.promise;
	};

	/**
	 * If a function would like to support both Node continuation-passing-style and
	 * promise-returning-style, it can end its internal promise chain with
	 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
	 * elects to use a nodeback, the result will be sent there.  If they do not
	 * pass a nodeback, they will receive the result promise.
	 * @param object a result (or a promise for a result)
	 * @param {Function} nodeback a Node.js-style callback
	 * @returns either the promise or nothing
	 */
	Q.nodeify = nodeify;
	function nodeify(object, nodeback) {
	    return Q(object).nodeify(nodeback);
	}

	Promise.prototype.nodeify = function (nodeback) {
	    if (nodeback) {
	        this.then(function (value) {
	            nextTick(function () {
	                nodeback(null, value);
	            });
	        }, function (error) {
	            nextTick(function () {
	                nodeback(error);
	            });
	        });
	    } else {
	        return this;
	    }
	};

	// All code before this point will be filtered from stack traces.
	var qEndingLine = captureLine();

	return Q;

	});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Licensed to the Apache Software Foundation (ASF) under one
	 * or more contributor license agreements. See the NOTICE file
	 * distributed with this work for additional information
	 * regarding copyright ownership. The ASF licenses this file
	 * to you under the Apache License, Version 2.0 (the
	 * "License"); you may not use this file except in compliance
	 * with the License. You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing,
	 * software distributed under the License is distributed on an
	 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	 * KIND, either express or implied. See the License for the
	 * specific language governing permissions and limitations
	 * under the License.
	 */
	var util = __webpack_require__(3);
	var Thrift = __webpack_require__(2);

	exports.Multiplexer = Multiplexer;

	function Wrapper(serviceName, protocol, connection) {

	  function MultiplexProtocol(trans, strictRead, strictWrite) {
	    protocol.call(this, trans, strictRead, strictWrite);
	  };

	  util.inherits(MultiplexProtocol, protocol);

	  MultiplexProtocol.prototype.writeMessageBegin = function(name, type, seqid) {
	    if (type == Thrift.MessageType.CALL || type == Thrift.MessageType.ONEWAY) {
	      connection.seqId2Service[seqid] = serviceName;
	      MultiplexProtocol.super_.prototype.writeMessageBegin.call(this,
	                                                                serviceName + ":" + name,
	                                                                type,
	                                                                seqid);
	    } else {
	      MultiplexProtocol.super_.prototype.writeMessageBegin.call(this, name, type, seqid);
	    }
	  };

	  return MultiplexProtocol;
	};

	function Multiplexer() {
	  this.seqid = 0;
	};

	Multiplexer.prototype.createClient = function(serviceName, ServiceClient, connection) {
	  if (ServiceClient.Client) {
	    ServiceClient = ServiceClient.Client;
	  }
	  var self = this;
	  ServiceClient.prototype.new_seqid = function() {
	    self.seqid += 1;
	    return self.seqid;
	  };
	  var writeCb = function(buf, seqid) {
	    connection.write(buf,seqid);
	  };
	  var transport = new connection.transport(undefined, writeCb);
	  var protocolWrapper = new Wrapper(serviceName, connection.protocol, connection);
	  var client = new ServiceClient(transport, protocolWrapper);

	  if (typeof connection.client !== 'object') {
	    connection.client = {};
	  }
	  connection.client[serviceName] = client;

	  return client;
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	//
	// Autogenerated by Thrift Compiler (0.9.3)
	//
	// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
	//

	var thrift = __webpack_require__(1);
	var Thrift = thrift.Thrift;
	var Q = thrift.Q;

	var ttypes = module.exports = {};
	ttypes.TDatumType = {
	  'SMALLINT': 0,
	  'INT': 1,
	  'BIGINT': 2,
	  'FLOAT': 3,
	  'DECIMAL': 4,
	  'DOUBLE': 5,
	  'STR': 6,
	  'TIME': 7,
	  'TIMESTAMP': 8,
	  'DATE': 9,
	  'BOOL': 10,
	  'INTERVAL_DAY_TIME': 11,
	  'INTERVAL_YEAR_MONTH': 12
	};
	ttypes.TEncodingType = {
	  'NONE': 0,
	  'FIXED': 1,
	  'RL': 2,
	  'DIFF': 3,
	  'DICT': 4,
	  'SPARSE': 5
	};
	ttypes.TExecuteMode = {
	  'HYBRID': 0,
	  'GPU': 1,
	  'CPU': 2
	};
	ttypes.TTableType = {
	  'DELIMITED': 0,
	  'POLYGON': 1
	};
	ttypes.TMergeType = {
	  'UNION': 0,
	  'REDUCE': 1
	};
	ttypes.TExpressionRangeType = {
	  'INVALID': 0,
	  'INTEGER': 1,
	  'FLOAT': 2,
	  'DOUBLE': 3
	};
	var TDatumVal = module.exports.TDatumVal = function (args) {
	  this.int_val = null;
	  this.real_val = null;
	  this.str_val = null;
	  this.arr_val = null;
	  if (args) {
	    if (args.int_val !== undefined && args.int_val !== null) {
	      this.int_val = args.int_val;
	    }
	    if (args.real_val !== undefined && args.real_val !== null) {
	      this.real_val = args.real_val;
	    }
	    if (args.str_val !== undefined && args.str_val !== null) {
	      this.str_val = args.str_val;
	    }
	    if (args.arr_val !== undefined && args.arr_val !== null) {
	      this.arr_val = Thrift.copyList(args.arr_val, [null]);
	    }
	  }
	};
	TDatumVal.prototype = {};
	TDatumVal.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I64) {
	          this.int_val = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.DOUBLE) {
	          this.real_val = input.readDouble();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.str_val = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.LIST) {
	          var _size0 = 0;
	          var _rtmp34;
	          this.arr_val = [];
	          var _etype3 = 0;
	          _rtmp34 = input.readListBegin();
	          _etype3 = _rtmp34.etype;
	          _size0 = _rtmp34.size;
	          for (var _i5 = 0; _i5 < _size0; ++_i5) {
	            var elem6 = null;
	            elem6 = new ttypes.TDatum();
	            elem6.read(input);
	            this.arr_val.push(elem6);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TDatumVal.prototype.write = function (output) {
	  output.writeStructBegin('TDatumVal');
	  if (this.int_val !== null && this.int_val !== undefined) {
	    output.writeFieldBegin('int_val', Thrift.Type.I64, 1);
	    output.writeI64(this.int_val);
	    output.writeFieldEnd();
	  }
	  if (this.real_val !== null && this.real_val !== undefined) {
	    output.writeFieldBegin('real_val', Thrift.Type.DOUBLE, 2);
	    output.writeDouble(this.real_val);
	    output.writeFieldEnd();
	  }
	  if (this.str_val !== null && this.str_val !== undefined) {
	    output.writeFieldBegin('str_val', Thrift.Type.STRING, 3);
	    output.writeString(this.str_val);
	    output.writeFieldEnd();
	  }
	  if (this.arr_val !== null && this.arr_val !== undefined) {
	    output.writeFieldBegin('arr_val', Thrift.Type.LIST, 4);
	    output.writeListBegin(Thrift.Type.STRUCT, this.arr_val.length);
	    for (var iter7 in this.arr_val) {
	      if (this.arr_val.hasOwnProperty(iter7)) {
	        iter7 = this.arr_val[iter7];
	        iter7.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TDatum = module.exports.TDatum = function (args) {
	  this.val = null;
	  this.is_null = null;
	  if (args) {
	    if (args.val !== undefined && args.val !== null) {
	      this.val = new ttypes.TDatumVal(args.val);
	    }
	    if (args.is_null !== undefined && args.is_null !== null) {
	      this.is_null = args.is_null;
	    }
	  }
	};
	TDatum.prototype = {};
	TDatum.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.val = new ttypes.TDatumVal();
	          this.val.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.BOOL) {
	          this.is_null = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TDatum.prototype.write = function (output) {
	  output.writeStructBegin('TDatum');
	  if (this.val !== null && this.val !== undefined) {
	    output.writeFieldBegin('val', Thrift.Type.STRUCT, 1);
	    this.val.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.is_null !== null && this.is_null !== undefined) {
	    output.writeFieldBegin('is_null', Thrift.Type.BOOL, 2);
	    output.writeBool(this.is_null);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TStringValue = module.exports.TStringValue = function (args) {
	  this.str_val = null;
	  this.is_null = null;
	  if (args) {
	    if (args.str_val !== undefined && args.str_val !== null) {
	      this.str_val = args.str_val;
	    }
	    if (args.is_null !== undefined && args.is_null !== null) {
	      this.is_null = args.is_null;
	    }
	  }
	};
	TStringValue.prototype = {};
	TStringValue.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.str_val = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.BOOL) {
	          this.is_null = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TStringValue.prototype.write = function (output) {
	  output.writeStructBegin('TStringValue');
	  if (this.str_val !== null && this.str_val !== undefined) {
	    output.writeFieldBegin('str_val', Thrift.Type.STRING, 1);
	    output.writeString(this.str_val);
	    output.writeFieldEnd();
	  }
	  if (this.is_null !== null && this.is_null !== undefined) {
	    output.writeFieldBegin('is_null', Thrift.Type.BOOL, 2);
	    output.writeBool(this.is_null);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TTypeInfo = module.exports.TTypeInfo = function (args) {
	  this.type = null;
	  this.encoding = null;
	  this.nullable = null;
	  this.is_array = null;
	  this.precision = null;
	  this.scale = null;
	  this.comp_param = null;
	  if (args) {
	    if (args.type !== undefined && args.type !== null) {
	      this.type = args.type;
	    }
	    if (args.encoding !== undefined && args.encoding !== null) {
	      this.encoding = args.encoding;
	    }
	    if (args.nullable !== undefined && args.nullable !== null) {
	      this.nullable = args.nullable;
	    }
	    if (args.is_array !== undefined && args.is_array !== null) {
	      this.is_array = args.is_array;
	    }
	    if (args.precision !== undefined && args.precision !== null) {
	      this.precision = args.precision;
	    }
	    if (args.scale !== undefined && args.scale !== null) {
	      this.scale = args.scale;
	    }
	    if (args.comp_param !== undefined && args.comp_param !== null) {
	      this.comp_param = args.comp_param;
	    }
	  }
	};
	TTypeInfo.prototype = {};
	TTypeInfo.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I32) {
	          this.type = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.I32) {
	          this.encoding = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.BOOL) {
	          this.nullable = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.BOOL) {
	          this.is_array = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.I32) {
	          this.precision = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.I32) {
	          this.scale = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 7:
	        if (ftype == Thrift.Type.I32) {
	          this.comp_param = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TTypeInfo.prototype.write = function (output) {
	  output.writeStructBegin('TTypeInfo');
	  if (this.type !== null && this.type !== undefined) {
	    output.writeFieldBegin('type', Thrift.Type.I32, 1);
	    output.writeI32(this.type);
	    output.writeFieldEnd();
	  }
	  if (this.encoding !== null && this.encoding !== undefined) {
	    output.writeFieldBegin('encoding', Thrift.Type.I32, 4);
	    output.writeI32(this.encoding);
	    output.writeFieldEnd();
	  }
	  if (this.nullable !== null && this.nullable !== undefined) {
	    output.writeFieldBegin('nullable', Thrift.Type.BOOL, 2);
	    output.writeBool(this.nullable);
	    output.writeFieldEnd();
	  }
	  if (this.is_array !== null && this.is_array !== undefined) {
	    output.writeFieldBegin('is_array', Thrift.Type.BOOL, 3);
	    output.writeBool(this.is_array);
	    output.writeFieldEnd();
	  }
	  if (this.precision !== null && this.precision !== undefined) {
	    output.writeFieldBegin('precision', Thrift.Type.I32, 5);
	    output.writeI32(this.precision);
	    output.writeFieldEnd();
	  }
	  if (this.scale !== null && this.scale !== undefined) {
	    output.writeFieldBegin('scale', Thrift.Type.I32, 6);
	    output.writeI32(this.scale);
	    output.writeFieldEnd();
	  }
	  if (this.comp_param !== null && this.comp_param !== undefined) {
	    output.writeFieldBegin('comp_param', Thrift.Type.I32, 7);
	    output.writeI32(this.comp_param);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TColumnType = module.exports.TColumnType = function (args) {
	  this.col_name = null;
	  this.col_type = null;
	  this.is_reserved_keyword = null;
	  this.src_name = null;
	  if (args) {
	    if (args.col_name !== undefined && args.col_name !== null) {
	      this.col_name = args.col_name;
	    }
	    if (args.col_type !== undefined && args.col_type !== null) {
	      this.col_type = new ttypes.TTypeInfo(args.col_type);
	    }
	    if (args.is_reserved_keyword !== undefined && args.is_reserved_keyword !== null) {
	      this.is_reserved_keyword = args.is_reserved_keyword;
	    }
	    if (args.src_name !== undefined && args.src_name !== null) {
	      this.src_name = args.src_name;
	    }
	  }
	};
	TColumnType.prototype = {};
	TColumnType.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.col_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.col_type = new ttypes.TTypeInfo();
	          this.col_type.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.BOOL) {
	          this.is_reserved_keyword = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.src_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TColumnType.prototype.write = function (output) {
	  output.writeStructBegin('TColumnType');
	  if (this.col_name !== null && this.col_name !== undefined) {
	    output.writeFieldBegin('col_name', Thrift.Type.STRING, 1);
	    output.writeString(this.col_name);
	    output.writeFieldEnd();
	  }
	  if (this.col_type !== null && this.col_type !== undefined) {
	    output.writeFieldBegin('col_type', Thrift.Type.STRUCT, 2);
	    this.col_type.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.is_reserved_keyword !== null && this.is_reserved_keyword !== undefined) {
	    output.writeFieldBegin('is_reserved_keyword', Thrift.Type.BOOL, 3);
	    output.writeBool(this.is_reserved_keyword);
	    output.writeFieldEnd();
	  }
	  if (this.src_name !== null && this.src_name !== undefined) {
	    output.writeFieldBegin('src_name', Thrift.Type.STRING, 4);
	    output.writeString(this.src_name);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TRow = module.exports.TRow = function (args) {
	  this.cols = null;
	  if (args) {
	    if (args.cols !== undefined && args.cols !== null) {
	      this.cols = Thrift.copyList(args.cols, [ttypes.TDatum]);
	    }
	  }
	};
	TRow.prototype = {};
	TRow.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.LIST) {
	          var _size8 = 0;
	          var _rtmp312;
	          this.cols = [];
	          var _etype11 = 0;
	          _rtmp312 = input.readListBegin();
	          _etype11 = _rtmp312.etype;
	          _size8 = _rtmp312.size;
	          for (var _i13 = 0; _i13 < _size8; ++_i13) {
	            var elem14 = null;
	            elem14 = new ttypes.TDatum();
	            elem14.read(input);
	            this.cols.push(elem14);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TRow.prototype.write = function (output) {
	  output.writeStructBegin('TRow');
	  if (this.cols !== null && this.cols !== undefined) {
	    output.writeFieldBegin('cols', Thrift.Type.LIST, 1);
	    output.writeListBegin(Thrift.Type.STRUCT, this.cols.length);
	    for (var iter15 in this.cols) {
	      if (this.cols.hasOwnProperty(iter15)) {
	        iter15 = this.cols[iter15];
	        iter15.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TColumnData = module.exports.TColumnData = function (args) {
	  this.int_col = null;
	  this.real_col = null;
	  this.str_col = null;
	  this.arr_col = null;
	  if (args) {
	    if (args.int_col !== undefined && args.int_col !== null) {
	      this.int_col = Thrift.copyList(args.int_col, [null]);
	    }
	    if (args.real_col !== undefined && args.real_col !== null) {
	      this.real_col = Thrift.copyList(args.real_col, [null]);
	    }
	    if (args.str_col !== undefined && args.str_col !== null) {
	      this.str_col = Thrift.copyList(args.str_col, [null]);
	    }
	    if (args.arr_col !== undefined && args.arr_col !== null) {
	      this.arr_col = Thrift.copyList(args.arr_col, [null]);
	    }
	  }
	};
	TColumnData.prototype = {};
	TColumnData.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.LIST) {
	          var _size16 = 0;
	          var _rtmp320;
	          this.int_col = [];
	          var _etype19 = 0;
	          _rtmp320 = input.readListBegin();
	          _etype19 = _rtmp320.etype;
	          _size16 = _rtmp320.size;
	          for (var _i21 = 0; _i21 < _size16; ++_i21) {
	            var elem22 = null;
	            elem22 = input.readI64();
	            this.int_col.push(elem22);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.LIST) {
	          var _size23 = 0;
	          var _rtmp327;
	          this.real_col = [];
	          var _etype26 = 0;
	          _rtmp327 = input.readListBegin();
	          _etype26 = _rtmp327.etype;
	          _size23 = _rtmp327.size;
	          for (var _i28 = 0; _i28 < _size23; ++_i28) {
	            var elem29 = null;
	            elem29 = input.readDouble();
	            this.real_col.push(elem29);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.LIST) {
	          var _size30 = 0;
	          var _rtmp334;
	          this.str_col = [];
	          var _etype33 = 0;
	          _rtmp334 = input.readListBegin();
	          _etype33 = _rtmp334.etype;
	          _size30 = _rtmp334.size;
	          for (var _i35 = 0; _i35 < _size30; ++_i35) {
	            var elem36 = null;
	            elem36 = input.readString();
	            this.str_col.push(elem36);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.LIST) {
	          var _size37 = 0;
	          var _rtmp341;
	          this.arr_col = [];
	          var _etype40 = 0;
	          _rtmp341 = input.readListBegin();
	          _etype40 = _rtmp341.etype;
	          _size37 = _rtmp341.size;
	          for (var _i42 = 0; _i42 < _size37; ++_i42) {
	            var elem43 = null;
	            elem43 = new ttypes.TColumn();
	            elem43.read(input);
	            this.arr_col.push(elem43);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TColumnData.prototype.write = function (output) {
	  output.writeStructBegin('TColumnData');
	  if (this.int_col !== null && this.int_col !== undefined) {
	    output.writeFieldBegin('int_col', Thrift.Type.LIST, 1);
	    output.writeListBegin(Thrift.Type.I64, this.int_col.length);
	    for (var iter44 in this.int_col) {
	      if (this.int_col.hasOwnProperty(iter44)) {
	        iter44 = this.int_col[iter44];
	        output.writeI64(iter44);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.real_col !== null && this.real_col !== undefined) {
	    output.writeFieldBegin('real_col', Thrift.Type.LIST, 2);
	    output.writeListBegin(Thrift.Type.DOUBLE, this.real_col.length);
	    for (var iter45 in this.real_col) {
	      if (this.real_col.hasOwnProperty(iter45)) {
	        iter45 = this.real_col[iter45];
	        output.writeDouble(iter45);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.str_col !== null && this.str_col !== undefined) {
	    output.writeFieldBegin('str_col', Thrift.Type.LIST, 3);
	    output.writeListBegin(Thrift.Type.STRING, this.str_col.length);
	    for (var iter46 in this.str_col) {
	      if (this.str_col.hasOwnProperty(iter46)) {
	        iter46 = this.str_col[iter46];
	        output.writeString(iter46);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.arr_col !== null && this.arr_col !== undefined) {
	    output.writeFieldBegin('arr_col', Thrift.Type.LIST, 4);
	    output.writeListBegin(Thrift.Type.STRUCT, this.arr_col.length);
	    for (var iter47 in this.arr_col) {
	      if (this.arr_col.hasOwnProperty(iter47)) {
	        iter47 = this.arr_col[iter47];
	        iter47.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TColumn = module.exports.TColumn = function (args) {
	  this.data = null;
	  this.nulls = null;
	  if (args) {
	    if (args.data !== undefined && args.data !== null) {
	      this.data = new ttypes.TColumnData(args.data);
	    }
	    if (args.nulls !== undefined && args.nulls !== null) {
	      this.nulls = Thrift.copyList(args.nulls, [null]);
	    }
	  }
	};
	TColumn.prototype = {};
	TColumn.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.data = new ttypes.TColumnData();
	          this.data.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.LIST) {
	          var _size48 = 0;
	          var _rtmp352;
	          this.nulls = [];
	          var _etype51 = 0;
	          _rtmp352 = input.readListBegin();
	          _etype51 = _rtmp352.etype;
	          _size48 = _rtmp352.size;
	          for (var _i53 = 0; _i53 < _size48; ++_i53) {
	            var elem54 = null;
	            elem54 = input.readBool();
	            this.nulls.push(elem54);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TColumn.prototype.write = function (output) {
	  output.writeStructBegin('TColumn');
	  if (this.data !== null && this.data !== undefined) {
	    output.writeFieldBegin('data', Thrift.Type.STRUCT, 1);
	    this.data.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.nulls !== null && this.nulls !== undefined) {
	    output.writeFieldBegin('nulls', Thrift.Type.LIST, 2);
	    output.writeListBegin(Thrift.Type.BOOL, this.nulls.length);
	    for (var iter55 in this.nulls) {
	      if (this.nulls.hasOwnProperty(iter55)) {
	        iter55 = this.nulls[iter55];
	        output.writeBool(iter55);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TStringRow = module.exports.TStringRow = function (args) {
	  this.cols = null;
	  if (args) {
	    if (args.cols !== undefined && args.cols !== null) {
	      this.cols = Thrift.copyList(args.cols, [ttypes.TStringValue]);
	    }
	  }
	};
	TStringRow.prototype = {};
	TStringRow.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.LIST) {
	          var _size56 = 0;
	          var _rtmp360;
	          this.cols = [];
	          var _etype59 = 0;
	          _rtmp360 = input.readListBegin();
	          _etype59 = _rtmp360.etype;
	          _size56 = _rtmp360.size;
	          for (var _i61 = 0; _i61 < _size56; ++_i61) {
	            var elem62 = null;
	            elem62 = new ttypes.TStringValue();
	            elem62.read(input);
	            this.cols.push(elem62);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TStringRow.prototype.write = function (output) {
	  output.writeStructBegin('TStringRow');
	  if (this.cols !== null && this.cols !== undefined) {
	    output.writeFieldBegin('cols', Thrift.Type.LIST, 1);
	    output.writeListBegin(Thrift.Type.STRUCT, this.cols.length);
	    for (var iter63 in this.cols) {
	      if (this.cols.hasOwnProperty(iter63)) {
	        iter63 = this.cols[iter63];
	        iter63.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TStepResult = module.exports.TStepResult = function (args) {
	  this.serialized_rows = null;
	  this.execution_finished = null;
	  this.merge_type = null;
	  this.sharded = null;
	  this.row_desc = null;
	  this.node_id = null;
	  if (args) {
	    if (args.serialized_rows !== undefined && args.serialized_rows !== null) {
	      this.serialized_rows = args.serialized_rows;
	    }
	    if (args.execution_finished !== undefined && args.execution_finished !== null) {
	      this.execution_finished = args.execution_finished;
	    }
	    if (args.merge_type !== undefined && args.merge_type !== null) {
	      this.merge_type = args.merge_type;
	    }
	    if (args.sharded !== undefined && args.sharded !== null) {
	      this.sharded = args.sharded;
	    }
	    if (args.row_desc !== undefined && args.row_desc !== null) {
	      this.row_desc = Thrift.copyList(args.row_desc, [ttypes.TColumnType]);
	    }
	    if (args.node_id !== undefined && args.node_id !== null) {
	      this.node_id = args.node_id;
	    }
	  }
	};
	TStepResult.prototype = {};
	TStepResult.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.serialized_rows = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.BOOL) {
	          this.execution_finished = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I32) {
	          this.merge_type = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.BOOL) {
	          this.sharded = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.LIST) {
	          var _size64 = 0;
	          var _rtmp368;
	          this.row_desc = [];
	          var _etype67 = 0;
	          _rtmp368 = input.readListBegin();
	          _etype67 = _rtmp368.etype;
	          _size64 = _rtmp368.size;
	          for (var _i69 = 0; _i69 < _size64; ++_i69) {
	            var elem70 = null;
	            elem70 = new ttypes.TColumnType();
	            elem70.read(input);
	            this.row_desc.push(elem70);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.I32) {
	          this.node_id = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TStepResult.prototype.write = function (output) {
	  output.writeStructBegin('TStepResult');
	  if (this.serialized_rows !== null && this.serialized_rows !== undefined) {
	    output.writeFieldBegin('serialized_rows', Thrift.Type.STRING, 1);
	    output.writeString(this.serialized_rows);
	    output.writeFieldEnd();
	  }
	  if (this.execution_finished !== null && this.execution_finished !== undefined) {
	    output.writeFieldBegin('execution_finished', Thrift.Type.BOOL, 2);
	    output.writeBool(this.execution_finished);
	    output.writeFieldEnd();
	  }
	  if (this.merge_type !== null && this.merge_type !== undefined) {
	    output.writeFieldBegin('merge_type', Thrift.Type.I32, 3);
	    output.writeI32(this.merge_type);
	    output.writeFieldEnd();
	  }
	  if (this.sharded !== null && this.sharded !== undefined) {
	    output.writeFieldBegin('sharded', Thrift.Type.BOOL, 4);
	    output.writeBool(this.sharded);
	    output.writeFieldEnd();
	  }
	  if (this.row_desc !== null && this.row_desc !== undefined) {
	    output.writeFieldBegin('row_desc', Thrift.Type.LIST, 5);
	    output.writeListBegin(Thrift.Type.STRUCT, this.row_desc.length);
	    for (var iter71 in this.row_desc) {
	      if (this.row_desc.hasOwnProperty(iter71)) {
	        iter71 = this.row_desc[iter71];
	        iter71.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.node_id !== null && this.node_id !== undefined) {
	    output.writeFieldBegin('node_id', Thrift.Type.I32, 6);
	    output.writeI32(this.node_id);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TRowSet = module.exports.TRowSet = function (args) {
	  this.row_desc = null;
	  this.rows = null;
	  this.columns = null;
	  this.is_columnar = null;
	  if (args) {
	    if (args.row_desc !== undefined && args.row_desc !== null) {
	      this.row_desc = Thrift.copyList(args.row_desc, [ttypes.TColumnType]);
	    }
	    if (args.rows !== undefined && args.rows !== null) {
	      this.rows = Thrift.copyList(args.rows, [ttypes.TRow]);
	    }
	    if (args.columns !== undefined && args.columns !== null) {
	      this.columns = Thrift.copyList(args.columns, [ttypes.TColumn]);
	    }
	    if (args.is_columnar !== undefined && args.is_columnar !== null) {
	      this.is_columnar = args.is_columnar;
	    }
	  }
	};
	TRowSet.prototype = {};
	TRowSet.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.LIST) {
	          var _size72 = 0;
	          var _rtmp376;
	          this.row_desc = [];
	          var _etype75 = 0;
	          _rtmp376 = input.readListBegin();
	          _etype75 = _rtmp376.etype;
	          _size72 = _rtmp376.size;
	          for (var _i77 = 0; _i77 < _size72; ++_i77) {
	            var elem78 = null;
	            elem78 = new ttypes.TColumnType();
	            elem78.read(input);
	            this.row_desc.push(elem78);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.LIST) {
	          var _size79 = 0;
	          var _rtmp383;
	          this.rows = [];
	          var _etype82 = 0;
	          _rtmp383 = input.readListBegin();
	          _etype82 = _rtmp383.etype;
	          _size79 = _rtmp383.size;
	          for (var _i84 = 0; _i84 < _size79; ++_i84) {
	            var elem85 = null;
	            elem85 = new ttypes.TRow();
	            elem85.read(input);
	            this.rows.push(elem85);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.LIST) {
	          var _size86 = 0;
	          var _rtmp390;
	          this.columns = [];
	          var _etype89 = 0;
	          _rtmp390 = input.readListBegin();
	          _etype89 = _rtmp390.etype;
	          _size86 = _rtmp390.size;
	          for (var _i91 = 0; _i91 < _size86; ++_i91) {
	            var elem92 = null;
	            elem92 = new ttypes.TColumn();
	            elem92.read(input);
	            this.columns.push(elem92);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.BOOL) {
	          this.is_columnar = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TRowSet.prototype.write = function (output) {
	  output.writeStructBegin('TRowSet');
	  if (this.row_desc !== null && this.row_desc !== undefined) {
	    output.writeFieldBegin('row_desc', Thrift.Type.LIST, 1);
	    output.writeListBegin(Thrift.Type.STRUCT, this.row_desc.length);
	    for (var iter93 in this.row_desc) {
	      if (this.row_desc.hasOwnProperty(iter93)) {
	        iter93 = this.row_desc[iter93];
	        iter93.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.rows !== null && this.rows !== undefined) {
	    output.writeFieldBegin('rows', Thrift.Type.LIST, 2);
	    output.writeListBegin(Thrift.Type.STRUCT, this.rows.length);
	    for (var iter94 in this.rows) {
	      if (this.rows.hasOwnProperty(iter94)) {
	        iter94 = this.rows[iter94];
	        iter94.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.columns !== null && this.columns !== undefined) {
	    output.writeFieldBegin('columns', Thrift.Type.LIST, 3);
	    output.writeListBegin(Thrift.Type.STRUCT, this.columns.length);
	    for (var iter95 in this.columns) {
	      if (this.columns.hasOwnProperty(iter95)) {
	        iter95 = this.columns[iter95];
	        iter95.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.is_columnar !== null && this.is_columnar !== undefined) {
	    output.writeFieldBegin('is_columnar', Thrift.Type.BOOL, 4);
	    output.writeBool(this.is_columnar);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TQueryResult = module.exports.TQueryResult = function (args) {
	  this.row_set = null;
	  this.execution_time_ms = null;
	  this.total_time_ms = null;
	  this.nonce = null;
	  if (args) {
	    if (args.row_set !== undefined && args.row_set !== null) {
	      this.row_set = new ttypes.TRowSet(args.row_set);
	    }
	    if (args.execution_time_ms !== undefined && args.execution_time_ms !== null) {
	      this.execution_time_ms = args.execution_time_ms;
	    }
	    if (args.total_time_ms !== undefined && args.total_time_ms !== null) {
	      this.total_time_ms = args.total_time_ms;
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	TQueryResult.prototype = {};
	TQueryResult.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.row_set = new ttypes.TRowSet();
	          this.row_set.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.execution_time_ms = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I64) {
	          this.total_time_ms = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TQueryResult.prototype.write = function (output) {
	  output.writeStructBegin('TQueryResult');
	  if (this.row_set !== null && this.row_set !== undefined) {
	    output.writeFieldBegin('row_set', Thrift.Type.STRUCT, 1);
	    this.row_set.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.execution_time_ms !== null && this.execution_time_ms !== undefined) {
	    output.writeFieldBegin('execution_time_ms', Thrift.Type.I64, 2);
	    output.writeI64(this.execution_time_ms);
	    output.writeFieldEnd();
	  }
	  if (this.total_time_ms !== null && this.total_time_ms !== undefined) {
	    output.writeFieldBegin('total_time_ms', Thrift.Type.I64, 3);
	    output.writeI64(this.total_time_ms);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 4);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TDBInfo = module.exports.TDBInfo = function (args) {
	  this.db_name = null;
	  this.db_owner = null;
	  if (args) {
	    if (args.db_name !== undefined && args.db_name !== null) {
	      this.db_name = args.db_name;
	    }
	    if (args.db_owner !== undefined && args.db_owner !== null) {
	      this.db_owner = args.db_owner;
	    }
	  }
	};
	TDBInfo.prototype = {};
	TDBInfo.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.db_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.db_owner = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TDBInfo.prototype.write = function (output) {
	  output.writeStructBegin('TDBInfo');
	  if (this.db_name !== null && this.db_name !== undefined) {
	    output.writeFieldBegin('db_name', Thrift.Type.STRING, 1);
	    output.writeString(this.db_name);
	    output.writeFieldEnd();
	  }
	  if (this.db_owner !== null && this.db_owner !== undefined) {
	    output.writeFieldBegin('db_owner', Thrift.Type.STRING, 2);
	    output.writeString(this.db_owner);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TMapDException = module.exports.TMapDException = function (args) {
	  Thrift.TException.call(this, "TMapDException");
	  this.name = "TMapDException";
	  this.error_msg = null;
	  if (args) {
	    if (args.error_msg !== undefined && args.error_msg !== null) {
	      this.error_msg = args.error_msg;
	    }
	  }
	};
	Thrift.inherits(TMapDException, Thrift.TException);
	TMapDException.prototype.name = 'TMapDException';
	TMapDException.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.error_msg = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TMapDException.prototype.write = function (output) {
	  output.writeStructBegin('TMapDException');
	  if (this.error_msg !== null && this.error_msg !== undefined) {
	    output.writeFieldBegin('error_msg', Thrift.Type.STRING, 1);
	    output.writeString(this.error_msg);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TRenderProperty = module.exports.TRenderProperty = function (args) {
	  this.property_type = null;
	  this.property_value = null;
	  if (args) {
	    if (args.property_type !== undefined && args.property_type !== null) {
	      this.property_type = args.property_type;
	    }
	    if (args.property_value !== undefined && args.property_value !== null) {
	      this.property_value = new ttypes.TDatumVal(args.property_value);
	    }
	  }
	};
	TRenderProperty.prototype = {};
	TRenderProperty.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I32) {
	          this.property_type = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.property_value = new ttypes.TDatumVal();
	          this.property_value.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TRenderProperty.prototype.write = function (output) {
	  output.writeStructBegin('TRenderProperty');
	  if (this.property_type !== null && this.property_type !== undefined) {
	    output.writeFieldBegin('property_type', Thrift.Type.I32, 1);
	    output.writeI32(this.property_type);
	    output.writeFieldEnd();
	  }
	  if (this.property_value !== null && this.property_value !== undefined) {
	    output.writeFieldBegin('property_value', Thrift.Type.STRUCT, 2);
	    this.property_value.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TCopyParams = module.exports.TCopyParams = function (args) {
	  this.delimiter = null;
	  this.null_str = null;
	  this.has_header = null;
	  this.quoted = null;
	  this.quote = null;
	  this.escape = null;
	  this.line_delim = null;
	  this.array_delim = null;
	  this.array_begin = null;
	  this.array_end = null;
	  this.threads = null;
	  this.table_type = 0;
	  if (args) {
	    if (args.delimiter !== undefined && args.delimiter !== null) {
	      this.delimiter = args.delimiter;
	    }
	    if (args.null_str !== undefined && args.null_str !== null) {
	      this.null_str = args.null_str;
	    }
	    if (args.has_header !== undefined && args.has_header !== null) {
	      this.has_header = args.has_header;
	    }
	    if (args.quoted !== undefined && args.quoted !== null) {
	      this.quoted = args.quoted;
	    }
	    if (args.quote !== undefined && args.quote !== null) {
	      this.quote = args.quote;
	    }
	    if (args.escape !== undefined && args.escape !== null) {
	      this.escape = args.escape;
	    }
	    if (args.line_delim !== undefined && args.line_delim !== null) {
	      this.line_delim = args.line_delim;
	    }
	    if (args.array_delim !== undefined && args.array_delim !== null) {
	      this.array_delim = args.array_delim;
	    }
	    if (args.array_begin !== undefined && args.array_begin !== null) {
	      this.array_begin = args.array_begin;
	    }
	    if (args.array_end !== undefined && args.array_end !== null) {
	      this.array_end = args.array_end;
	    }
	    if (args.threads !== undefined && args.threads !== null) {
	      this.threads = args.threads;
	    }
	    if (args.table_type !== undefined && args.table_type !== null) {
	      this.table_type = args.table_type;
	    }
	  }
	};
	TCopyParams.prototype = {};
	TCopyParams.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.delimiter = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.null_str = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.BOOL) {
	          this.has_header = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.BOOL) {
	          this.quoted = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.STRING) {
	          this.quote = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.STRING) {
	          this.escape = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 7:
	        if (ftype == Thrift.Type.STRING) {
	          this.line_delim = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 8:
	        if (ftype == Thrift.Type.STRING) {
	          this.array_delim = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 9:
	        if (ftype == Thrift.Type.STRING) {
	          this.array_begin = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 10:
	        if (ftype == Thrift.Type.STRING) {
	          this.array_end = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 11:
	        if (ftype == Thrift.Type.I32) {
	          this.threads = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 12:
	        if (ftype == Thrift.Type.I32) {
	          this.table_type = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TCopyParams.prototype.write = function (output) {
	  output.writeStructBegin('TCopyParams');
	  if (this.delimiter !== null && this.delimiter !== undefined) {
	    output.writeFieldBegin('delimiter', Thrift.Type.STRING, 1);
	    output.writeString(this.delimiter);
	    output.writeFieldEnd();
	  }
	  if (this.null_str !== null && this.null_str !== undefined) {
	    output.writeFieldBegin('null_str', Thrift.Type.STRING, 2);
	    output.writeString(this.null_str);
	    output.writeFieldEnd();
	  }
	  if (this.has_header !== null && this.has_header !== undefined) {
	    output.writeFieldBegin('has_header', Thrift.Type.BOOL, 3);
	    output.writeBool(this.has_header);
	    output.writeFieldEnd();
	  }
	  if (this.quoted !== null && this.quoted !== undefined) {
	    output.writeFieldBegin('quoted', Thrift.Type.BOOL, 4);
	    output.writeBool(this.quoted);
	    output.writeFieldEnd();
	  }
	  if (this.quote !== null && this.quote !== undefined) {
	    output.writeFieldBegin('quote', Thrift.Type.STRING, 5);
	    output.writeString(this.quote);
	    output.writeFieldEnd();
	  }
	  if (this.escape !== null && this.escape !== undefined) {
	    output.writeFieldBegin('escape', Thrift.Type.STRING, 6);
	    output.writeString(this.escape);
	    output.writeFieldEnd();
	  }
	  if (this.line_delim !== null && this.line_delim !== undefined) {
	    output.writeFieldBegin('line_delim', Thrift.Type.STRING, 7);
	    output.writeString(this.line_delim);
	    output.writeFieldEnd();
	  }
	  if (this.array_delim !== null && this.array_delim !== undefined) {
	    output.writeFieldBegin('array_delim', Thrift.Type.STRING, 8);
	    output.writeString(this.array_delim);
	    output.writeFieldEnd();
	  }
	  if (this.array_begin !== null && this.array_begin !== undefined) {
	    output.writeFieldBegin('array_begin', Thrift.Type.STRING, 9);
	    output.writeString(this.array_begin);
	    output.writeFieldEnd();
	  }
	  if (this.array_end !== null && this.array_end !== undefined) {
	    output.writeFieldBegin('array_end', Thrift.Type.STRING, 10);
	    output.writeString(this.array_end);
	    output.writeFieldEnd();
	  }
	  if (this.threads !== null && this.threads !== undefined) {
	    output.writeFieldBegin('threads', Thrift.Type.I32, 11);
	    output.writeI32(this.threads);
	    output.writeFieldEnd();
	  }
	  if (this.table_type !== null && this.table_type !== undefined) {
	    output.writeFieldBegin('table_type', Thrift.Type.I32, 12);
	    output.writeI32(this.table_type);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TDetectResult = module.exports.TDetectResult = function (args) {
	  this.row_set = null;
	  this.copy_params = null;
	  if (args) {
	    if (args.row_set !== undefined && args.row_set !== null) {
	      this.row_set = new ttypes.TRowSet(args.row_set);
	    }
	    if (args.copy_params !== undefined && args.copy_params !== null) {
	      this.copy_params = new ttypes.TCopyParams(args.copy_params);
	    }
	  }
	};
	TDetectResult.prototype = {};
	TDetectResult.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.row_set = new ttypes.TRowSet();
	          this.row_set.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.copy_params = new ttypes.TCopyParams();
	          this.copy_params.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TDetectResult.prototype.write = function (output) {
	  output.writeStructBegin('TDetectResult');
	  if (this.row_set !== null && this.row_set !== undefined) {
	    output.writeFieldBegin('row_set', Thrift.Type.STRUCT, 1);
	    this.row_set.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.copy_params !== null && this.copy_params !== undefined) {
	    output.writeFieldBegin('copy_params', Thrift.Type.STRUCT, 2);
	    this.copy_params.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TImportStatus = module.exports.TImportStatus = function (args) {
	  this.elapsed = null;
	  this.rows_completed = null;
	  this.rows_estimated = null;
	  this.rows_rejected = null;
	  if (args) {
	    if (args.elapsed !== undefined && args.elapsed !== null) {
	      this.elapsed = args.elapsed;
	    }
	    if (args.rows_completed !== undefined && args.rows_completed !== null) {
	      this.rows_completed = args.rows_completed;
	    }
	    if (args.rows_estimated !== undefined && args.rows_estimated !== null) {
	      this.rows_estimated = args.rows_estimated;
	    }
	    if (args.rows_rejected !== undefined && args.rows_rejected !== null) {
	      this.rows_rejected = args.rows_rejected;
	    }
	  }
	};
	TImportStatus.prototype = {};
	TImportStatus.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I64) {
	          this.elapsed = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.rows_completed = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I64) {
	          this.rows_estimated = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.I64) {
	          this.rows_rejected = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TImportStatus.prototype.write = function (output) {
	  output.writeStructBegin('TImportStatus');
	  if (this.elapsed !== null && this.elapsed !== undefined) {
	    output.writeFieldBegin('elapsed', Thrift.Type.I64, 1);
	    output.writeI64(this.elapsed);
	    output.writeFieldEnd();
	  }
	  if (this.rows_completed !== null && this.rows_completed !== undefined) {
	    output.writeFieldBegin('rows_completed', Thrift.Type.I64, 2);
	    output.writeI64(this.rows_completed);
	    output.writeFieldEnd();
	  }
	  if (this.rows_estimated !== null && this.rows_estimated !== undefined) {
	    output.writeFieldBegin('rows_estimated', Thrift.Type.I64, 3);
	    output.writeI64(this.rows_estimated);
	    output.writeFieldEnd();
	  }
	  if (this.rows_rejected !== null && this.rows_rejected !== undefined) {
	    output.writeFieldBegin('rows_rejected', Thrift.Type.I64, 4);
	    output.writeI64(this.rows_rejected);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TFrontendView = module.exports.TFrontendView = function (args) {
	  this.view_name = null;
	  this.view_state = null;
	  this.image_hash = null;
	  this.update_time = null;
	  this.view_metadata = null;
	  if (args) {
	    if (args.view_name !== undefined && args.view_name !== null) {
	      this.view_name = args.view_name;
	    }
	    if (args.view_state !== undefined && args.view_state !== null) {
	      this.view_state = args.view_state;
	    }
	    if (args.image_hash !== undefined && args.image_hash !== null) {
	      this.image_hash = args.image_hash;
	    }
	    if (args.update_time !== undefined && args.update_time !== null) {
	      this.update_time = args.update_time;
	    }
	    if (args.view_metadata !== undefined && args.view_metadata !== null) {
	      this.view_metadata = args.view_metadata;
	    }
	  }
	};
	TFrontendView.prototype = {};
	TFrontendView.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_state = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.image_hash = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.update_time = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_metadata = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TFrontendView.prototype.write = function (output) {
	  output.writeStructBegin('TFrontendView');
	  if (this.view_name !== null && this.view_name !== undefined) {
	    output.writeFieldBegin('view_name', Thrift.Type.STRING, 1);
	    output.writeString(this.view_name);
	    output.writeFieldEnd();
	  }
	  if (this.view_state !== null && this.view_state !== undefined) {
	    output.writeFieldBegin('view_state', Thrift.Type.STRING, 2);
	    output.writeString(this.view_state);
	    output.writeFieldEnd();
	  }
	  if (this.image_hash !== null && this.image_hash !== undefined) {
	    output.writeFieldBegin('image_hash', Thrift.Type.STRING, 3);
	    output.writeString(this.image_hash);
	    output.writeFieldEnd();
	  }
	  if (this.update_time !== null && this.update_time !== undefined) {
	    output.writeFieldBegin('update_time', Thrift.Type.STRING, 4);
	    output.writeString(this.update_time);
	    output.writeFieldEnd();
	  }
	  if (this.view_metadata !== null && this.view_metadata !== undefined) {
	    output.writeFieldBegin('view_metadata', Thrift.Type.STRING, 5);
	    output.writeString(this.view_metadata);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TServerStatus = module.exports.TServerStatus = function (args) {
	  this.read_only = null;
	  this.version = null;
	  this.rendering_enabled = null;
	  this.start_time = null;
	  if (args) {
	    if (args.read_only !== undefined && args.read_only !== null) {
	      this.read_only = args.read_only;
	    }
	    if (args.version !== undefined && args.version !== null) {
	      this.version = args.version;
	    }
	    if (args.rendering_enabled !== undefined && args.rendering_enabled !== null) {
	      this.rendering_enabled = args.rendering_enabled;
	    }
	    if (args.start_time !== undefined && args.start_time !== null) {
	      this.start_time = args.start_time;
	    }
	  }
	};
	TServerStatus.prototype = {};
	TServerStatus.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.BOOL) {
	          this.read_only = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.version = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.BOOL) {
	          this.rendering_enabled = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.I64) {
	          this.start_time = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TServerStatus.prototype.write = function (output) {
	  output.writeStructBegin('TServerStatus');
	  if (this.read_only !== null && this.read_only !== undefined) {
	    output.writeFieldBegin('read_only', Thrift.Type.BOOL, 1);
	    output.writeBool(this.read_only);
	    output.writeFieldEnd();
	  }
	  if (this.version !== null && this.version !== undefined) {
	    output.writeFieldBegin('version', Thrift.Type.STRING, 2);
	    output.writeString(this.version);
	    output.writeFieldEnd();
	  }
	  if (this.rendering_enabled !== null && this.rendering_enabled !== undefined) {
	    output.writeFieldBegin('rendering_enabled', Thrift.Type.BOOL, 3);
	    output.writeBool(this.rendering_enabled);
	    output.writeFieldEnd();
	  }
	  if (this.start_time !== null && this.start_time !== undefined) {
	    output.writeFieldBegin('start_time', Thrift.Type.I64, 4);
	    output.writeI64(this.start_time);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TPixel = module.exports.TPixel = function (args) {
	  this.x = null;
	  this.y = null;
	  if (args) {
	    if (args.x !== undefined && args.x !== null) {
	      this.x = args.x;
	    }
	    if (args.y !== undefined && args.y !== null) {
	      this.y = args.y;
	    }
	  }
	};
	TPixel.prototype = {};
	TPixel.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I64) {
	          this.x = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.y = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TPixel.prototype.write = function (output) {
	  output.writeStructBegin('TPixel');
	  if (this.x !== null && this.x !== undefined) {
	    output.writeFieldBegin('x', Thrift.Type.I64, 1);
	    output.writeI64(this.x);
	    output.writeFieldEnd();
	  }
	  if (this.y !== null && this.y !== undefined) {
	    output.writeFieldBegin('y', Thrift.Type.I64, 2);
	    output.writeI64(this.y);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TPixelRowResult = module.exports.TPixelRowResult = function (args) {
	  this.pixel = null;
	  this.row_id = null;
	  this.row_set = null;
	  this.nonce = null;
	  if (args) {
	    if (args.pixel !== undefined && args.pixel !== null) {
	      this.pixel = new ttypes.TPixel(args.pixel);
	    }
	    if (args.row_id !== undefined && args.row_id !== null) {
	      this.row_id = args.row_id;
	    }
	    if (args.row_set !== undefined && args.row_set !== null) {
	      this.row_set = new ttypes.TRowSet(args.row_set);
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	TPixelRowResult.prototype = {};
	TPixelRowResult.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.pixel = new ttypes.TPixel();
	          this.pixel.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.row_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.row_set = new ttypes.TRowSet();
	          this.row_set.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TPixelRowResult.prototype.write = function (output) {
	  output.writeStructBegin('TPixelRowResult');
	  if (this.pixel !== null && this.pixel !== undefined) {
	    output.writeFieldBegin('pixel', Thrift.Type.STRUCT, 1);
	    this.pixel.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.row_id !== null && this.row_id !== undefined) {
	    output.writeFieldBegin('row_id', Thrift.Type.I64, 2);
	    output.writeI64(this.row_id);
	    output.writeFieldEnd();
	  }
	  if (this.row_set !== null && this.row_set !== undefined) {
	    output.writeFieldBegin('row_set', Thrift.Type.STRUCT, 3);
	    this.row_set.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 4);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TPixelTableRowResult = module.exports.TPixelTableRowResult = function (args) {
	  this.pixel = null;
	  this.vega_table_name = null;
	  this.table_id = null;
	  this.row_id = null;
	  this.row_set = null;
	  this.nonce = null;
	  if (args) {
	    if (args.pixel !== undefined && args.pixel !== null) {
	      this.pixel = new ttypes.TPixel(args.pixel);
	    }
	    if (args.vega_table_name !== undefined && args.vega_table_name !== null) {
	      this.vega_table_name = args.vega_table_name;
	    }
	    if (args.table_id !== undefined && args.table_id !== null) {
	      this.table_id = args.table_id;
	    }
	    if (args.row_id !== undefined && args.row_id !== null) {
	      this.row_id = args.row_id;
	    }
	    if (args.row_set !== undefined && args.row_set !== null) {
	      this.row_set = new ttypes.TRowSet(args.row_set);
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	TPixelTableRowResult.prototype = {};
	TPixelTableRowResult.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.pixel = new ttypes.TPixel();
	          this.pixel.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.vega_table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I64) {
	          this.table_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.I64) {
	          this.row_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.row_set = new ttypes.TRowSet();
	          this.row_set.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TPixelTableRowResult.prototype.write = function (output) {
	  output.writeStructBegin('TPixelTableRowResult');
	  if (this.pixel !== null && this.pixel !== undefined) {
	    output.writeFieldBegin('pixel', Thrift.Type.STRUCT, 1);
	    this.pixel.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.vega_table_name !== null && this.vega_table_name !== undefined) {
	    output.writeFieldBegin('vega_table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.vega_table_name);
	    output.writeFieldEnd();
	  }
	  if (this.table_id !== null && this.table_id !== undefined) {
	    output.writeFieldBegin('table_id', Thrift.Type.I64, 3);
	    output.writeI64(this.table_id);
	    output.writeFieldEnd();
	  }
	  if (this.row_id !== null && this.row_id !== undefined) {
	    output.writeFieldBegin('row_id', Thrift.Type.I64, 4);
	    output.writeI64(this.row_id);
	    output.writeFieldEnd();
	  }
	  if (this.row_set !== null && this.row_set !== undefined) {
	    output.writeFieldBegin('row_set', Thrift.Type.STRUCT, 5);
	    this.row_set.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 6);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TPixelRows = module.exports.TPixelRows = function (args) {
	  this.pixel = null;
	  this.row_set = null;
	  if (args) {
	    if (args.pixel !== undefined && args.pixel !== null) {
	      this.pixel = new ttypes.TPixel(args.pixel);
	    }
	    if (args.row_set !== undefined && args.row_set !== null) {
	      this.row_set = new ttypes.TRowSet(args.row_set);
	    }
	  }
	};
	TPixelRows.prototype = {};
	TPixelRows.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.pixel = new ttypes.TPixel();
	          this.pixel.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.row_set = new ttypes.TRowSet();
	          this.row_set.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TPixelRows.prototype.write = function (output) {
	  output.writeStructBegin('TPixelRows');
	  if (this.pixel !== null && this.pixel !== undefined) {
	    output.writeFieldBegin('pixel', Thrift.Type.STRUCT, 1);
	    this.pixel.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.row_set !== null && this.row_set !== undefined) {
	    output.writeFieldBegin('row_set', Thrift.Type.STRUCT, 2);
	    this.row_set.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TPixelResult = module.exports.TPixelResult = function (args) {
	  this.pixel_rows = null;
	  this.nonce = null;
	  if (args) {
	    if (args.pixel_rows !== undefined && args.pixel_rows !== null) {
	      this.pixel_rows = Thrift.copyList(args.pixel_rows, [ttypes.TPixelRows]);
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	TPixelResult.prototype = {};
	TPixelResult.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.LIST) {
	          var _size96 = 0;
	          var _rtmp3100;
	          this.pixel_rows = [];
	          var _etype99 = 0;
	          _rtmp3100 = input.readListBegin();
	          _etype99 = _rtmp3100.etype;
	          _size96 = _rtmp3100.size;
	          for (var _i101 = 0; _i101 < _size96; ++_i101) {
	            var elem102 = null;
	            elem102 = new ttypes.TPixelRows();
	            elem102.read(input);
	            this.pixel_rows.push(elem102);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TPixelResult.prototype.write = function (output) {
	  output.writeStructBegin('TPixelResult');
	  if (this.pixel_rows !== null && this.pixel_rows !== undefined) {
	    output.writeFieldBegin('pixel_rows', Thrift.Type.LIST, 1);
	    output.writeListBegin(Thrift.Type.STRUCT, this.pixel_rows.length);
	    for (var iter103 in this.pixel_rows) {
	      if (this.pixel_rows.hasOwnProperty(iter103)) {
	        iter103 = this.pixel_rows[iter103];
	        iter103.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 2);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TRenderResult = module.exports.TRenderResult = function (args) {
	  this.image = null;
	  this.nonce = null;
	  this.execution_time_ms = null;
	  this.render_time_ms = null;
	  this.total_time_ms = null;
	  if (args) {
	    if (args.image !== undefined && args.image !== null) {
	      this.image = args.image;
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	    if (args.execution_time_ms !== undefined && args.execution_time_ms !== null) {
	      this.execution_time_ms = args.execution_time_ms;
	    }
	    if (args.render_time_ms !== undefined && args.render_time_ms !== null) {
	      this.render_time_ms = args.render_time_ms;
	    }
	    if (args.total_time_ms !== undefined && args.total_time_ms !== null) {
	      this.total_time_ms = args.total_time_ms;
	    }
	  }
	};
	TRenderResult.prototype = {};
	TRenderResult.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.image = input.readBinary();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I64) {
	          this.execution_time_ms = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.I64) {
	          this.render_time_ms = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.I64) {
	          this.total_time_ms = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TRenderResult.prototype.write = function (output) {
	  output.writeStructBegin('TRenderResult');
	  if (this.image !== null && this.image !== undefined) {
	    output.writeFieldBegin('image', Thrift.Type.STRING, 1);
	    output.writeBinary(this.image);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 2);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  if (this.execution_time_ms !== null && this.execution_time_ms !== undefined) {
	    output.writeFieldBegin('execution_time_ms', Thrift.Type.I64, 3);
	    output.writeI64(this.execution_time_ms);
	    output.writeFieldEnd();
	  }
	  if (this.render_time_ms !== null && this.render_time_ms !== undefined) {
	    output.writeFieldBegin('render_time_ms', Thrift.Type.I64, 4);
	    output.writeI64(this.render_time_ms);
	    output.writeFieldEnd();
	  }
	  if (this.total_time_ms !== null && this.total_time_ms !== undefined) {
	    output.writeFieldBegin('total_time_ms', Thrift.Type.I64, 5);
	    output.writeI64(this.total_time_ms);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TGpuMemorySummary = module.exports.TGpuMemorySummary = function (args) {
	  this.max = null;
	  this.in_use = null;
	  this.allocated = null;
	  this.is_allocation_capped = null;
	  if (args) {
	    if (args.max !== undefined && args.max !== null) {
	      this.max = args.max;
	    }
	    if (args.in_use !== undefined && args.in_use !== null) {
	      this.in_use = args.in_use;
	    }
	    if (args.allocated !== undefined && args.allocated !== null) {
	      this.allocated = args.allocated;
	    }
	    if (args.is_allocation_capped !== undefined && args.is_allocation_capped !== null) {
	      this.is_allocation_capped = args.is_allocation_capped;
	    }
	  }
	};
	TGpuMemorySummary.prototype = {};
	TGpuMemorySummary.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I64) {
	          this.max = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.in_use = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I64) {
	          this.allocated = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.BOOL) {
	          this.is_allocation_capped = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TGpuMemorySummary.prototype.write = function (output) {
	  output.writeStructBegin('TGpuMemorySummary');
	  if (this.max !== null && this.max !== undefined) {
	    output.writeFieldBegin('max', Thrift.Type.I64, 1);
	    output.writeI64(this.max);
	    output.writeFieldEnd();
	  }
	  if (this.in_use !== null && this.in_use !== undefined) {
	    output.writeFieldBegin('in_use', Thrift.Type.I64, 2);
	    output.writeI64(this.in_use);
	    output.writeFieldEnd();
	  }
	  if (this.allocated !== null && this.allocated !== undefined) {
	    output.writeFieldBegin('allocated', Thrift.Type.I64, 3);
	    output.writeI64(this.allocated);
	    output.writeFieldEnd();
	  }
	  if (this.is_allocation_capped !== null && this.is_allocation_capped !== undefined) {
	    output.writeFieldBegin('is_allocation_capped', Thrift.Type.BOOL, 4);
	    output.writeBool(this.is_allocation_capped);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TMemorySummary = module.exports.TMemorySummary = function (args) {
	  this.cpu_memory_in_use = null;
	  this.gpu_summary = null;
	  if (args) {
	    if (args.cpu_memory_in_use !== undefined && args.cpu_memory_in_use !== null) {
	      this.cpu_memory_in_use = args.cpu_memory_in_use;
	    }
	    if (args.gpu_summary !== undefined && args.gpu_summary !== null) {
	      this.gpu_summary = Thrift.copyList(args.gpu_summary, [ttypes.TGpuMemorySummary]);
	    }
	  }
	};
	TMemorySummary.prototype = {};
	TMemorySummary.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I64) {
	          this.cpu_memory_in_use = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.LIST) {
	          var _size104 = 0;
	          var _rtmp3108;
	          this.gpu_summary = [];
	          var _etype107 = 0;
	          _rtmp3108 = input.readListBegin();
	          _etype107 = _rtmp3108.etype;
	          _size104 = _rtmp3108.size;
	          for (var _i109 = 0; _i109 < _size104; ++_i109) {
	            var elem110 = null;
	            elem110 = new ttypes.TGpuMemorySummary();
	            elem110.read(input);
	            this.gpu_summary.push(elem110);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TMemorySummary.prototype.write = function (output) {
	  output.writeStructBegin('TMemorySummary');
	  if (this.cpu_memory_in_use !== null && this.cpu_memory_in_use !== undefined) {
	    output.writeFieldBegin('cpu_memory_in_use', Thrift.Type.I64, 1);
	    output.writeI64(this.cpu_memory_in_use);
	    output.writeFieldEnd();
	  }
	  if (this.gpu_summary !== null && this.gpu_summary !== undefined) {
	    output.writeFieldBegin('gpu_summary', Thrift.Type.LIST, 2);
	    output.writeListBegin(Thrift.Type.STRUCT, this.gpu_summary.length);
	    for (var iter111 in this.gpu_summary) {
	      if (this.gpu_summary.hasOwnProperty(iter111)) {
	        iter111 = this.gpu_summary[iter111];
	        iter111.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TTableDetails = module.exports.TTableDetails = function (args) {
	  this.row_desc = null;
	  this.fragment_size = null;
	  this.page_size = null;
	  this.max_rows = null;
	  this.view_sql = null;
	  if (args) {
	    if (args.row_desc !== undefined && args.row_desc !== null) {
	      this.row_desc = Thrift.copyList(args.row_desc, [ttypes.TColumnType]);
	    }
	    if (args.fragment_size !== undefined && args.fragment_size !== null) {
	      this.fragment_size = args.fragment_size;
	    }
	    if (args.page_size !== undefined && args.page_size !== null) {
	      this.page_size = args.page_size;
	    }
	    if (args.max_rows !== undefined && args.max_rows !== null) {
	      this.max_rows = args.max_rows;
	    }
	    if (args.view_sql !== undefined && args.view_sql !== null) {
	      this.view_sql = args.view_sql;
	    }
	  }
	};
	TTableDetails.prototype = {};
	TTableDetails.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.LIST) {
	          var _size112 = 0;
	          var _rtmp3116;
	          this.row_desc = [];
	          var _etype115 = 0;
	          _rtmp3116 = input.readListBegin();
	          _etype115 = _rtmp3116.etype;
	          _size112 = _rtmp3116.size;
	          for (var _i117 = 0; _i117 < _size112; ++_i117) {
	            var elem118 = null;
	            elem118 = new ttypes.TColumnType();
	            elem118.read(input);
	            this.row_desc.push(elem118);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.fragment_size = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I64) {
	          this.page_size = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.I64) {
	          this.max_rows = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_sql = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TTableDetails.prototype.write = function (output) {
	  output.writeStructBegin('TTableDetails');
	  if (this.row_desc !== null && this.row_desc !== undefined) {
	    output.writeFieldBegin('row_desc', Thrift.Type.LIST, 1);
	    output.writeListBegin(Thrift.Type.STRUCT, this.row_desc.length);
	    for (var iter119 in this.row_desc) {
	      if (this.row_desc.hasOwnProperty(iter119)) {
	        iter119 = this.row_desc[iter119];
	        iter119.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.fragment_size !== null && this.fragment_size !== undefined) {
	    output.writeFieldBegin('fragment_size', Thrift.Type.I64, 2);
	    output.writeI64(this.fragment_size);
	    output.writeFieldEnd();
	  }
	  if (this.page_size !== null && this.page_size !== undefined) {
	    output.writeFieldBegin('page_size', Thrift.Type.I64, 3);
	    output.writeI64(this.page_size);
	    output.writeFieldEnd();
	  }
	  if (this.max_rows !== null && this.max_rows !== undefined) {
	    output.writeFieldBegin('max_rows', Thrift.Type.I64, 4);
	    output.writeI64(this.max_rows);
	    output.writeFieldEnd();
	  }
	  if (this.view_sql !== null && this.view_sql !== undefined) {
	    output.writeFieldBegin('view_sql', Thrift.Type.STRING, 5);
	    output.writeString(this.view_sql);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TColumnRange = module.exports.TColumnRange = function (args) {
	  this.type = null;
	  this.col_id = null;
	  this.table_id = null;
	  this.has_nulls = null;
	  this.int_min = null;
	  this.int_max = null;
	  this.bucket = null;
	  this.fp_min = null;
	  this.fp_max = null;
	  if (args) {
	    if (args.type !== undefined && args.type !== null) {
	      this.type = args.type;
	    }
	    if (args.col_id !== undefined && args.col_id !== null) {
	      this.col_id = args.col_id;
	    }
	    if (args.table_id !== undefined && args.table_id !== null) {
	      this.table_id = args.table_id;
	    }
	    if (args.has_nulls !== undefined && args.has_nulls !== null) {
	      this.has_nulls = args.has_nulls;
	    }
	    if (args.int_min !== undefined && args.int_min !== null) {
	      this.int_min = args.int_min;
	    }
	    if (args.int_max !== undefined && args.int_max !== null) {
	      this.int_max = args.int_max;
	    }
	    if (args.bucket !== undefined && args.bucket !== null) {
	      this.bucket = args.bucket;
	    }
	    if (args.fp_min !== undefined && args.fp_min !== null) {
	      this.fp_min = args.fp_min;
	    }
	    if (args.fp_max !== undefined && args.fp_max !== null) {
	      this.fp_max = args.fp_max;
	    }
	  }
	};
	TColumnRange.prototype = {};
	TColumnRange.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I32) {
	          this.type = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I32) {
	          this.col_id = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I32) {
	          this.table_id = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.BOOL) {
	          this.has_nulls = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.I64) {
	          this.int_min = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.I64) {
	          this.int_max = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 7:
	        if (ftype == Thrift.Type.I64) {
	          this.bucket = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 8:
	        if (ftype == Thrift.Type.DOUBLE) {
	          this.fp_min = input.readDouble();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 9:
	        if (ftype == Thrift.Type.DOUBLE) {
	          this.fp_max = input.readDouble();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TColumnRange.prototype.write = function (output) {
	  output.writeStructBegin('TColumnRange');
	  if (this.type !== null && this.type !== undefined) {
	    output.writeFieldBegin('type', Thrift.Type.I32, 1);
	    output.writeI32(this.type);
	    output.writeFieldEnd();
	  }
	  if (this.col_id !== null && this.col_id !== undefined) {
	    output.writeFieldBegin('col_id', Thrift.Type.I32, 2);
	    output.writeI32(this.col_id);
	    output.writeFieldEnd();
	  }
	  if (this.table_id !== null && this.table_id !== undefined) {
	    output.writeFieldBegin('table_id', Thrift.Type.I32, 3);
	    output.writeI32(this.table_id);
	    output.writeFieldEnd();
	  }
	  if (this.has_nulls !== null && this.has_nulls !== undefined) {
	    output.writeFieldBegin('has_nulls', Thrift.Type.BOOL, 4);
	    output.writeBool(this.has_nulls);
	    output.writeFieldEnd();
	  }
	  if (this.int_min !== null && this.int_min !== undefined) {
	    output.writeFieldBegin('int_min', Thrift.Type.I64, 5);
	    output.writeI64(this.int_min);
	    output.writeFieldEnd();
	  }
	  if (this.int_max !== null && this.int_max !== undefined) {
	    output.writeFieldBegin('int_max', Thrift.Type.I64, 6);
	    output.writeI64(this.int_max);
	    output.writeFieldEnd();
	  }
	  if (this.bucket !== null && this.bucket !== undefined) {
	    output.writeFieldBegin('bucket', Thrift.Type.I64, 7);
	    output.writeI64(this.bucket);
	    output.writeFieldEnd();
	  }
	  if (this.fp_min !== null && this.fp_min !== undefined) {
	    output.writeFieldBegin('fp_min', Thrift.Type.DOUBLE, 8);
	    output.writeDouble(this.fp_min);
	    output.writeFieldEnd();
	  }
	  if (this.fp_max !== null && this.fp_max !== undefined) {
	    output.writeFieldBegin('fp_max', Thrift.Type.DOUBLE, 9);
	    output.writeDouble(this.fp_max);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TDictionaryGeneration = module.exports.TDictionaryGeneration = function (args) {
	  this.dict_id = null;
	  this.entry_count = null;
	  if (args) {
	    if (args.dict_id !== undefined && args.dict_id !== null) {
	      this.dict_id = args.dict_id;
	    }
	    if (args.entry_count !== undefined && args.entry_count !== null) {
	      this.entry_count = args.entry_count;
	    }
	  }
	};
	TDictionaryGeneration.prototype = {};
	TDictionaryGeneration.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I32) {
	          this.dict_id = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.entry_count = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TDictionaryGeneration.prototype.write = function (output) {
	  output.writeStructBegin('TDictionaryGeneration');
	  if (this.dict_id !== null && this.dict_id !== undefined) {
	    output.writeFieldBegin('dict_id', Thrift.Type.I32, 1);
	    output.writeI32(this.dict_id);
	    output.writeFieldEnd();
	  }
	  if (this.entry_count !== null && this.entry_count !== undefined) {
	    output.writeFieldBegin('entry_count', Thrift.Type.I64, 2);
	    output.writeI64(this.entry_count);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TTableGeneration = module.exports.TTableGeneration = function (args) {
	  this.table_id = null;
	  this.tuple_count = null;
	  this.start_rowid = null;
	  if (args) {
	    if (args.table_id !== undefined && args.table_id !== null) {
	      this.table_id = args.table_id;
	    }
	    if (args.tuple_count !== undefined && args.tuple_count !== null) {
	      this.tuple_count = args.tuple_count;
	    }
	    if (args.start_rowid !== undefined && args.start_rowid !== null) {
	      this.start_rowid = args.start_rowid;
	    }
	  }
	};
	TTableGeneration.prototype = {};
	TTableGeneration.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I32) {
	          this.table_id = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.tuple_count = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I64) {
	          this.start_rowid = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TTableGeneration.prototype.write = function (output) {
	  output.writeStructBegin('TTableGeneration');
	  if (this.table_id !== null && this.table_id !== undefined) {
	    output.writeFieldBegin('table_id', Thrift.Type.I32, 1);
	    output.writeI32(this.table_id);
	    output.writeFieldEnd();
	  }
	  if (this.tuple_count !== null && this.tuple_count !== undefined) {
	    output.writeFieldBegin('tuple_count', Thrift.Type.I64, 2);
	    output.writeI64(this.tuple_count);
	    output.writeFieldEnd();
	  }
	  if (this.start_rowid !== null && this.start_rowid !== undefined) {
	    output.writeFieldBegin('start_rowid', Thrift.Type.I64, 3);
	    output.writeI64(this.start_rowid);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TPendingQuery = module.exports.TPendingQuery = function (args) {
	  this.id = null;
	  this.column_ranges = null;
	  this.dictionary_generations = null;
	  this.table_generations = null;
	  if (args) {
	    if (args.id !== undefined && args.id !== null) {
	      this.id = args.id;
	    }
	    if (args.column_ranges !== undefined && args.column_ranges !== null) {
	      this.column_ranges = Thrift.copyList(args.column_ranges, [ttypes.TColumnRange]);
	    }
	    if (args.dictionary_generations !== undefined && args.dictionary_generations !== null) {
	      this.dictionary_generations = Thrift.copyList(args.dictionary_generations, [ttypes.TDictionaryGeneration]);
	    }
	    if (args.table_generations !== undefined && args.table_generations !== null) {
	      this.table_generations = Thrift.copyList(args.table_generations, [ttypes.TTableGeneration]);
	    }
	  }
	};
	TPendingQuery.prototype = {};
	TPendingQuery.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I64) {
	          this.id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.LIST) {
	          var _size120 = 0;
	          var _rtmp3124;
	          this.column_ranges = [];
	          var _etype123 = 0;
	          _rtmp3124 = input.readListBegin();
	          _etype123 = _rtmp3124.etype;
	          _size120 = _rtmp3124.size;
	          for (var _i125 = 0; _i125 < _size120; ++_i125) {
	            var elem126 = null;
	            elem126 = new ttypes.TColumnRange();
	            elem126.read(input);
	            this.column_ranges.push(elem126);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.LIST) {
	          var _size127 = 0;
	          var _rtmp3131;
	          this.dictionary_generations = [];
	          var _etype130 = 0;
	          _rtmp3131 = input.readListBegin();
	          _etype130 = _rtmp3131.etype;
	          _size127 = _rtmp3131.size;
	          for (var _i132 = 0; _i132 < _size127; ++_i132) {
	            var elem133 = null;
	            elem133 = new ttypes.TDictionaryGeneration();
	            elem133.read(input);
	            this.dictionary_generations.push(elem133);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.LIST) {
	          var _size134 = 0;
	          var _rtmp3138;
	          this.table_generations = [];
	          var _etype137 = 0;
	          _rtmp3138 = input.readListBegin();
	          _etype137 = _rtmp3138.etype;
	          _size134 = _rtmp3138.size;
	          for (var _i139 = 0; _i139 < _size134; ++_i139) {
	            var elem140 = null;
	            elem140 = new ttypes.TTableGeneration();
	            elem140.read(input);
	            this.table_generations.push(elem140);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TPendingQuery.prototype.write = function (output) {
	  output.writeStructBegin('TPendingQuery');
	  if (this.id !== null && this.id !== undefined) {
	    output.writeFieldBegin('id', Thrift.Type.I64, 1);
	    output.writeI64(this.id);
	    output.writeFieldEnd();
	  }
	  if (this.column_ranges !== null && this.column_ranges !== undefined) {
	    output.writeFieldBegin('column_ranges', Thrift.Type.LIST, 2);
	    output.writeListBegin(Thrift.Type.STRUCT, this.column_ranges.length);
	    for (var iter141 in this.column_ranges) {
	      if (this.column_ranges.hasOwnProperty(iter141)) {
	        iter141 = this.column_ranges[iter141];
	        iter141.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.dictionary_generations !== null && this.dictionary_generations !== undefined) {
	    output.writeFieldBegin('dictionary_generations', Thrift.Type.LIST, 3);
	    output.writeListBegin(Thrift.Type.STRUCT, this.dictionary_generations.length);
	    for (var iter142 in this.dictionary_generations) {
	      if (this.dictionary_generations.hasOwnProperty(iter142)) {
	        iter142 = this.dictionary_generations[iter142];
	        iter142.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.table_generations !== null && this.table_generations !== undefined) {
	    output.writeFieldBegin('table_generations', Thrift.Type.LIST, 4);
	    output.writeListBegin(Thrift.Type.STRUCT, this.table_generations.length);
	    for (var iter143 in this.table_generations) {
	      if (this.table_generations.hasOwnProperty(iter143)) {
	        iter143 = this.table_generations[iter143];
	        iter143.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TVarLen = module.exports.TVarLen = function (args) {
	  this.payload = null;
	  this.is_null = null;
	  if (args) {
	    if (args.payload !== undefined && args.payload !== null) {
	      this.payload = args.payload;
	    }
	    if (args.is_null !== undefined && args.is_null !== null) {
	      this.is_null = args.is_null;
	    }
	  }
	};
	TVarLen.prototype = {};
	TVarLen.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.payload = input.readBinary();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.BOOL) {
	          this.is_null = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TVarLen.prototype.write = function (output) {
	  output.writeStructBegin('TVarLen');
	  if (this.payload !== null && this.payload !== undefined) {
	    output.writeFieldBegin('payload', Thrift.Type.STRING, 1);
	    output.writeBinary(this.payload);
	    output.writeFieldEnd();
	  }
	  if (this.is_null !== null && this.is_null !== undefined) {
	    output.writeFieldBegin('is_null', Thrift.Type.BOOL, 2);
	    output.writeBool(this.is_null);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TDataBlockPtr = module.exports.TDataBlockPtr = function (args) {
	  this.fixed_len_data = null;
	  this.var_len_data = null;
	  if (args) {
	    if (args.fixed_len_data !== undefined && args.fixed_len_data !== null) {
	      this.fixed_len_data = args.fixed_len_data;
	    }
	    if (args.var_len_data !== undefined && args.var_len_data !== null) {
	      this.var_len_data = Thrift.copyList(args.var_len_data, [ttypes.TVarLen]);
	    }
	  }
	};
	TDataBlockPtr.prototype = {};
	TDataBlockPtr.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.fixed_len_data = input.readBinary();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.LIST) {
	          var _size144 = 0;
	          var _rtmp3148;
	          this.var_len_data = [];
	          var _etype147 = 0;
	          _rtmp3148 = input.readListBegin();
	          _etype147 = _rtmp3148.etype;
	          _size144 = _rtmp3148.size;
	          for (var _i149 = 0; _i149 < _size144; ++_i149) {
	            var elem150 = null;
	            elem150 = new ttypes.TVarLen();
	            elem150.read(input);
	            this.var_len_data.push(elem150);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TDataBlockPtr.prototype.write = function (output) {
	  output.writeStructBegin('TDataBlockPtr');
	  if (this.fixed_len_data !== null && this.fixed_len_data !== undefined) {
	    output.writeFieldBegin('fixed_len_data', Thrift.Type.STRING, 1);
	    output.writeBinary(this.fixed_len_data);
	    output.writeFieldEnd();
	  }
	  if (this.var_len_data !== null && this.var_len_data !== undefined) {
	    output.writeFieldBegin('var_len_data', Thrift.Type.LIST, 2);
	    output.writeListBegin(Thrift.Type.STRUCT, this.var_len_data.length);
	    for (var iter151 in this.var_len_data) {
	      if (this.var_len_data.hasOwnProperty(iter151)) {
	        iter151 = this.var_len_data[iter151];
	        iter151.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TInsertData = module.exports.TInsertData = function (args) {
	  this.db_id = null;
	  this.table_id = null;
	  this.column_ids = null;
	  this.data = null;
	  this.num_rows = null;
	  if (args) {
	    if (args.db_id !== undefined && args.db_id !== null) {
	      this.db_id = args.db_id;
	    }
	    if (args.table_id !== undefined && args.table_id !== null) {
	      this.table_id = args.table_id;
	    }
	    if (args.column_ids !== undefined && args.column_ids !== null) {
	      this.column_ids = Thrift.copyList(args.column_ids, [null]);
	    }
	    if (args.data !== undefined && args.data !== null) {
	      this.data = Thrift.copyList(args.data, [ttypes.TDataBlockPtr]);
	    }
	    if (args.num_rows !== undefined && args.num_rows !== null) {
	      this.num_rows = args.num_rows;
	    }
	  }
	};
	TInsertData.prototype = {};
	TInsertData.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I32) {
	          this.db_id = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I32) {
	          this.table_id = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.LIST) {
	          var _size152 = 0;
	          var _rtmp3156;
	          this.column_ids = [];
	          var _etype155 = 0;
	          _rtmp3156 = input.readListBegin();
	          _etype155 = _rtmp3156.etype;
	          _size152 = _rtmp3156.size;
	          for (var _i157 = 0; _i157 < _size152; ++_i157) {
	            var elem158 = null;
	            elem158 = input.readI32();
	            this.column_ids.push(elem158);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.LIST) {
	          var _size159 = 0;
	          var _rtmp3163;
	          this.data = [];
	          var _etype162 = 0;
	          _rtmp3163 = input.readListBegin();
	          _etype162 = _rtmp3163.etype;
	          _size159 = _rtmp3163.size;
	          for (var _i164 = 0; _i164 < _size159; ++_i164) {
	            var elem165 = null;
	            elem165 = new ttypes.TDataBlockPtr();
	            elem165.read(input);
	            this.data.push(elem165);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.I64) {
	          this.num_rows = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TInsertData.prototype.write = function (output) {
	  output.writeStructBegin('TInsertData');
	  if (this.db_id !== null && this.db_id !== undefined) {
	    output.writeFieldBegin('db_id', Thrift.Type.I32, 1);
	    output.writeI32(this.db_id);
	    output.writeFieldEnd();
	  }
	  if (this.table_id !== null && this.table_id !== undefined) {
	    output.writeFieldBegin('table_id', Thrift.Type.I32, 2);
	    output.writeI32(this.table_id);
	    output.writeFieldEnd();
	  }
	  if (this.column_ids !== null && this.column_ids !== undefined) {
	    output.writeFieldBegin('column_ids', Thrift.Type.LIST, 3);
	    output.writeListBegin(Thrift.Type.I32, this.column_ids.length);
	    for (var iter166 in this.column_ids) {
	      if (this.column_ids.hasOwnProperty(iter166)) {
	        iter166 = this.column_ids[iter166];
	        output.writeI32(iter166);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.data !== null && this.data !== undefined) {
	    output.writeFieldBegin('data', Thrift.Type.LIST, 4);
	    output.writeListBegin(Thrift.Type.STRUCT, this.data.length);
	    for (var iter167 in this.data) {
	      if (this.data.hasOwnProperty(iter167)) {
	        iter167 = this.data[iter167];
	        iter167.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.num_rows !== null && this.num_rows !== undefined) {
	    output.writeFieldBegin('num_rows', Thrift.Type.I64, 5);
	    output.writeI64(this.num_rows);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var TRawPixelDataResult = module.exports.TRawPixelDataResult = function (args) {
	  this.width = null;
	  this.height = null;
	  this.num_channels = null;
	  this.pixels = null;
	  this.row_ids_A = null;
	  this.row_ids_B = null;
	  this.table_ids = null;
	  this.execution_time_ms = null;
	  this.render_time_ms = null;
	  this.total_time_ms = null;
	  if (args) {
	    if (args.width !== undefined && args.width !== null) {
	      this.width = args.width;
	    }
	    if (args.height !== undefined && args.height !== null) {
	      this.height = args.height;
	    }
	    if (args.num_channels !== undefined && args.num_channels !== null) {
	      this.num_channels = args.num_channels;
	    }
	    if (args.pixels !== undefined && args.pixels !== null) {
	      this.pixels = args.pixels;
	    }
	    if (args.row_ids_A !== undefined && args.row_ids_A !== null) {
	      this.row_ids_A = args.row_ids_A;
	    }
	    if (args.row_ids_B !== undefined && args.row_ids_B !== null) {
	      this.row_ids_B = args.row_ids_B;
	    }
	    if (args.table_ids !== undefined && args.table_ids !== null) {
	      this.table_ids = args.table_ids;
	    }
	    if (args.execution_time_ms !== undefined && args.execution_time_ms !== null) {
	      this.execution_time_ms = args.execution_time_ms;
	    }
	    if (args.render_time_ms !== undefined && args.render_time_ms !== null) {
	      this.render_time_ms = args.render_time_ms;
	    }
	    if (args.total_time_ms !== undefined && args.total_time_ms !== null) {
	      this.total_time_ms = args.total_time_ms;
	    }
	  }
	};
	TRawPixelDataResult.prototype = {};
	TRawPixelDataResult.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.I32) {
	          this.width = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I32) {
	          this.height = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I32) {
	          this.num_channels = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.pixels = input.readBinary();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.STRING) {
	          this.row_ids_A = input.readBinary();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.STRING) {
	          this.row_ids_B = input.readBinary();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 7:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_ids = input.readBinary();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 8:
	        if (ftype == Thrift.Type.I64) {
	          this.execution_time_ms = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 9:
	        if (ftype == Thrift.Type.I64) {
	          this.render_time_ms = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 10:
	        if (ftype == Thrift.Type.I64) {
	          this.total_time_ms = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	TRawPixelDataResult.prototype.write = function (output) {
	  output.writeStructBegin('TRawPixelDataResult');
	  if (this.width !== null && this.width !== undefined) {
	    output.writeFieldBegin('width', Thrift.Type.I32, 1);
	    output.writeI32(this.width);
	    output.writeFieldEnd();
	  }
	  if (this.height !== null && this.height !== undefined) {
	    output.writeFieldBegin('height', Thrift.Type.I32, 2);
	    output.writeI32(this.height);
	    output.writeFieldEnd();
	  }
	  if (this.num_channels !== null && this.num_channels !== undefined) {
	    output.writeFieldBegin('num_channels', Thrift.Type.I32, 3);
	    output.writeI32(this.num_channels);
	    output.writeFieldEnd();
	  }
	  if (this.pixels !== null && this.pixels !== undefined) {
	    output.writeFieldBegin('pixels', Thrift.Type.STRING, 4);
	    output.writeBinary(this.pixels);
	    output.writeFieldEnd();
	  }
	  if (this.row_ids_A !== null && this.row_ids_A !== undefined) {
	    output.writeFieldBegin('row_ids_A', Thrift.Type.STRING, 5);
	    output.writeBinary(this.row_ids_A);
	    output.writeFieldEnd();
	  }
	  if (this.row_ids_B !== null && this.row_ids_B !== undefined) {
	    output.writeFieldBegin('row_ids_B', Thrift.Type.STRING, 6);
	    output.writeBinary(this.row_ids_B);
	    output.writeFieldEnd();
	  }
	  if (this.table_ids !== null && this.table_ids !== undefined) {
	    output.writeFieldBegin('table_ids', Thrift.Type.STRING, 7);
	    output.writeBinary(this.table_ids);
	    output.writeFieldEnd();
	  }
	  if (this.execution_time_ms !== null && this.execution_time_ms !== undefined) {
	    output.writeFieldBegin('execution_time_ms', Thrift.Type.I64, 8);
	    output.writeI64(this.execution_time_ms);
	    output.writeFieldEnd();
	  }
	  if (this.render_time_ms !== null && this.render_time_ms !== undefined) {
	    output.writeFieldBegin('render_time_ms', Thrift.Type.I64, 9);
	    output.writeI64(this.render_time_ms);
	    output.writeFieldEnd();
	  }
	  if (this.total_time_ms !== null && this.total_time_ms !== undefined) {
	    output.writeFieldBegin('total_time_ms', Thrift.Type.I64, 10);
	    output.writeI64(this.total_time_ms);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	//
	// Autogenerated by Thrift Compiler (0.9.3)
	//
	// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
	//

	var thrift = __webpack_require__(1);
	var Thrift = thrift.Thrift;
	var Q = thrift.Q;

	var ttypes = __webpack_require__(52);
	//HELPER FUNCTIONS AND STRUCTURES

	var MapD_connect_args = function MapD_connect_args(args) {
	  this.user = null;
	  this.passwd = null;
	  this.dbname = null;
	  if (args) {
	    if (args.user !== undefined && args.user !== null) {
	      this.user = args.user;
	    }
	    if (args.passwd !== undefined && args.passwd !== null) {
	      this.passwd = args.passwd;
	    }
	    if (args.dbname !== undefined && args.dbname !== null) {
	      this.dbname = args.dbname;
	    }
	  }
	};
	MapD_connect_args.prototype = {};
	MapD_connect_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.user = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.passwd = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.dbname = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_connect_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_connect_args');
	  if (this.user !== null && this.user !== undefined) {
	    output.writeFieldBegin('user', Thrift.Type.STRING, 1);
	    output.writeString(this.user);
	    output.writeFieldEnd();
	  }
	  if (this.passwd !== null && this.passwd !== undefined) {
	    output.writeFieldBegin('passwd', Thrift.Type.STRING, 2);
	    output.writeString(this.passwd);
	    output.writeFieldEnd();
	  }
	  if (this.dbname !== null && this.dbname !== undefined) {
	    output.writeFieldBegin('dbname', Thrift.Type.STRING, 3);
	    output.writeString(this.dbname);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_connect_result = function MapD_connect_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = args.success;
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_connect_result.prototype = {};
	MapD_connect_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRING) {
	          this.success = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_connect_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_connect_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
	    output.writeString(this.success);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_disconnect_args = function MapD_disconnect_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_disconnect_args.prototype = {};
	MapD_disconnect_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_disconnect_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_disconnect_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_disconnect_result = function MapD_disconnect_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_disconnect_result.prototype = {};
	MapD_disconnect_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_disconnect_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_disconnect_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_server_status_args = function MapD_get_server_status_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_get_server_status_args.prototype = {};
	MapD_get_server_status_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_server_status_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_server_status_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_server_status_result = function MapD_get_server_status_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TServerStatus(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_server_status_result.prototype = {};
	MapD_get_server_status_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TServerStatus();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_server_status_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_server_status_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_tables_args = function MapD_get_tables_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_get_tables_args.prototype = {};
	MapD_get_tables_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_tables_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_tables_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_tables_result = function MapD_get_tables_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = Thrift.copyList(args.success, [null]);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_tables_result.prototype = {};
	MapD_get_tables_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.LIST) {
	          var _size168 = 0;
	          var _rtmp3172;
	          this.success = [];
	          var _etype171 = 0;
	          _rtmp3172 = input.readListBegin();
	          _etype171 = _rtmp3172.etype;
	          _size168 = _rtmp3172.size;
	          for (var _i173 = 0; _i173 < _size168; ++_i173) {
	            var elem174 = null;
	            elem174 = input.readString();
	            this.success.push(elem174);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_tables_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_tables_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
	    output.writeListBegin(Thrift.Type.STRING, this.success.length);
	    for (var iter175 in this.success) {
	      if (this.success.hasOwnProperty(iter175)) {
	        iter175 = this.success[iter175];
	        output.writeString(iter175);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_table_details_args = function MapD_get_table_details_args(args) {
	  this.session = null;
	  this.table_name = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	  }
	};
	MapD_get_table_details_args.prototype = {};
	MapD_get_table_details_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_table_details_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_table_details_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_table_details_result = function MapD_get_table_details_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TTableDetails(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_table_details_result.prototype = {};
	MapD_get_table_details_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TTableDetails();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_table_details_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_table_details_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_users_args = function MapD_get_users_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_get_users_args.prototype = {};
	MapD_get_users_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_users_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_users_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_users_result = function MapD_get_users_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = Thrift.copyList(args.success, [null]);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_users_result.prototype = {};
	MapD_get_users_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.LIST) {
	          var _size176 = 0;
	          var _rtmp3180;
	          this.success = [];
	          var _etype179 = 0;
	          _rtmp3180 = input.readListBegin();
	          _etype179 = _rtmp3180.etype;
	          _size176 = _rtmp3180.size;
	          for (var _i181 = 0; _i181 < _size176; ++_i181) {
	            var elem182 = null;
	            elem182 = input.readString();
	            this.success.push(elem182);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_users_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_users_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
	    output.writeListBegin(Thrift.Type.STRING, this.success.length);
	    for (var iter183 in this.success) {
	      if (this.success.hasOwnProperty(iter183)) {
	        iter183 = this.success[iter183];
	        output.writeString(iter183);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_databases_args = function MapD_get_databases_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_get_databases_args.prototype = {};
	MapD_get_databases_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_databases_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_databases_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_databases_result = function MapD_get_databases_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = Thrift.copyList(args.success, [ttypes.TDBInfo]);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_databases_result.prototype = {};
	MapD_get_databases_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.LIST) {
	          var _size184 = 0;
	          var _rtmp3188;
	          this.success = [];
	          var _etype187 = 0;
	          _rtmp3188 = input.readListBegin();
	          _etype187 = _rtmp3188.etype;
	          _size184 = _rtmp3188.size;
	          for (var _i189 = 0; _i189 < _size184; ++_i189) {
	            var elem190 = null;
	            elem190 = new ttypes.TDBInfo();
	            elem190.read(input);
	            this.success.push(elem190);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_databases_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_databases_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
	    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
	    for (var iter191 in this.success) {
	      if (this.success.hasOwnProperty(iter191)) {
	        iter191 = this.success[iter191];
	        iter191.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_version_args = function MapD_get_version_args(args) {};
	MapD_get_version_args.prototype = {};
	MapD_get_version_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    input.skip(ftype);
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_version_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_version_args');
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_version_result = function MapD_get_version_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = args.success;
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_version_result.prototype = {};
	MapD_get_version_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRING) {
	          this.success = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_version_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_version_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
	    output.writeString(this.success);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_start_heap_profile_args = function MapD_start_heap_profile_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_start_heap_profile_args.prototype = {};
	MapD_start_heap_profile_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_start_heap_profile_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_start_heap_profile_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_start_heap_profile_result = function MapD_start_heap_profile_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_start_heap_profile_result.prototype = {};
	MapD_start_heap_profile_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_start_heap_profile_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_start_heap_profile_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_stop_heap_profile_args = function MapD_stop_heap_profile_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_stop_heap_profile_args.prototype = {};
	MapD_stop_heap_profile_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_stop_heap_profile_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_stop_heap_profile_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_stop_heap_profile_result = function MapD_stop_heap_profile_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_stop_heap_profile_result.prototype = {};
	MapD_stop_heap_profile_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_stop_heap_profile_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_stop_heap_profile_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_heap_profile_args = function MapD_get_heap_profile_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_get_heap_profile_args.prototype = {};
	MapD_get_heap_profile_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_heap_profile_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_heap_profile_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_heap_profile_result = function MapD_get_heap_profile_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = args.success;
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_heap_profile_result.prototype = {};
	MapD_get_heap_profile_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRING) {
	          this.success = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_heap_profile_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_heap_profile_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
	    output.writeString(this.success);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_memory_gpu_args = function MapD_get_memory_gpu_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_get_memory_gpu_args.prototype = {};
	MapD_get_memory_gpu_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_memory_gpu_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_memory_gpu_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_memory_gpu_result = function MapD_get_memory_gpu_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = args.success;
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_memory_gpu_result.prototype = {};
	MapD_get_memory_gpu_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRING) {
	          this.success = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_memory_gpu_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_memory_gpu_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
	    output.writeString(this.success);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_memory_summary_args = function MapD_get_memory_summary_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_get_memory_summary_args.prototype = {};
	MapD_get_memory_summary_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_memory_summary_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_memory_summary_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_memory_summary_result = function MapD_get_memory_summary_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TMemorySummary(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_memory_summary_result.prototype = {};
	MapD_get_memory_summary_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TMemorySummary();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_memory_summary_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_memory_summary_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_clear_cpu_memory_args = function MapD_clear_cpu_memory_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_clear_cpu_memory_args.prototype = {};
	MapD_clear_cpu_memory_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_clear_cpu_memory_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_clear_cpu_memory_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_clear_cpu_memory_result = function MapD_clear_cpu_memory_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_clear_cpu_memory_result.prototype = {};
	MapD_clear_cpu_memory_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_clear_cpu_memory_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_clear_cpu_memory_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_clear_gpu_memory_args = function MapD_clear_gpu_memory_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_clear_gpu_memory_args.prototype = {};
	MapD_clear_gpu_memory_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_clear_gpu_memory_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_clear_gpu_memory_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_clear_gpu_memory_result = function MapD_clear_gpu_memory_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_clear_gpu_memory_result.prototype = {};
	MapD_clear_gpu_memory_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_clear_gpu_memory_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_clear_gpu_memory_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_sql_execute_args = function MapD_sql_execute_args(args) {
	  this.session = null;
	  this.query = null;
	  this.column_format = null;
	  this.nonce = null;
	  this.first_n = -1;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.query !== undefined && args.query !== null) {
	      this.query = args.query;
	    }
	    if (args.column_format !== undefined && args.column_format !== null) {
	      this.column_format = args.column_format;
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	    if (args.first_n !== undefined && args.first_n !== null) {
	      this.first_n = args.first_n;
	    }
	  }
	};
	MapD_sql_execute_args.prototype = {};
	MapD_sql_execute_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.query = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.BOOL) {
	          this.column_format = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.I32) {
	          this.first_n = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_sql_execute_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_sql_execute_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.query !== null && this.query !== undefined) {
	    output.writeFieldBegin('query', Thrift.Type.STRING, 2);
	    output.writeString(this.query);
	    output.writeFieldEnd();
	  }
	  if (this.column_format !== null && this.column_format !== undefined) {
	    output.writeFieldBegin('column_format', Thrift.Type.BOOL, 3);
	    output.writeBool(this.column_format);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 4);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  if (this.first_n !== null && this.first_n !== undefined) {
	    output.writeFieldBegin('first_n', Thrift.Type.I32, 5);
	    output.writeI32(this.first_n);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_sql_execute_result = function MapD_sql_execute_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TQueryResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_sql_execute_result.prototype = {};
	MapD_sql_execute_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TQueryResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_sql_execute_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_sql_execute_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_interrupt_args = function MapD_interrupt_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_interrupt_args.prototype = {};
	MapD_interrupt_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_interrupt_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_interrupt_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_interrupt_result = function MapD_interrupt_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_interrupt_result.prototype = {};
	MapD_interrupt_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_interrupt_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_interrupt_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_sql_validate_args = function MapD_sql_validate_args(args) {
	  this.session = null;
	  this.query = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.query !== undefined && args.query !== null) {
	      this.query = args.query;
	    }
	  }
	};
	MapD_sql_validate_args.prototype = {};
	MapD_sql_validate_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.query = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_sql_validate_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_sql_validate_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.query !== null && this.query !== undefined) {
	    output.writeFieldBegin('query', Thrift.Type.STRING, 2);
	    output.writeString(this.query);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_sql_validate_result = function MapD_sql_validate_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = Thrift.copyMap(args.success, [ttypes.TColumnType]);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_sql_validate_result.prototype = {};
	MapD_sql_validate_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.MAP) {
	          var _size192 = 0;
	          var _rtmp3196;
	          this.success = {};
	          var _ktype193 = 0;
	          var _vtype194 = 0;
	          _rtmp3196 = input.readMapBegin();
	          _ktype193 = _rtmp3196.ktype;
	          _vtype194 = _rtmp3196.vtype;
	          _size192 = _rtmp3196.size;
	          for (var _i197 = 0; _i197 < _size192; ++_i197) {
	            var key198 = null;
	            var val199 = null;
	            key198 = input.readString();
	            val199 = new ttypes.TColumnType();
	            val199.read(input);
	            this.success[key198] = val199;
	          }
	          input.readMapEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_sql_validate_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_sql_validate_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.MAP, 0);
	    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRUCT, Thrift.objectLength(this.success));
	    for (var kiter200 in this.success) {
	      if (this.success.hasOwnProperty(kiter200)) {
	        var viter201 = this.success[kiter200];
	        output.writeString(kiter200);
	        viter201.write(output);
	      }
	    }
	    output.writeMapEnd();
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_set_execution_mode_args = function MapD_set_execution_mode_args(args) {
	  this.session = null;
	  this.mode = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.mode !== undefined && args.mode !== null) {
	      this.mode = args.mode;
	    }
	  }
	};
	MapD_set_execution_mode_args.prototype = {};
	MapD_set_execution_mode_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I32) {
	          this.mode = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_set_execution_mode_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_set_execution_mode_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.mode !== null && this.mode !== undefined) {
	    output.writeFieldBegin('mode', Thrift.Type.I32, 2);
	    output.writeI32(this.mode);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_set_execution_mode_result = function MapD_set_execution_mode_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_set_execution_mode_result.prototype = {};
	MapD_set_execution_mode_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_set_execution_mode_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_set_execution_mode_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_render_vega_args = function MapD_render_vega_args(args) {
	  this.session = null;
	  this.widget_id = null;
	  this.vega_json = null;
	  this.compression_level = null;
	  this.nonce = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.widget_id !== undefined && args.widget_id !== null) {
	      this.widget_id = args.widget_id;
	    }
	    if (args.vega_json !== undefined && args.vega_json !== null) {
	      this.vega_json = args.vega_json;
	    }
	    if (args.compression_level !== undefined && args.compression_level !== null) {
	      this.compression_level = args.compression_level;
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	MapD_render_vega_args.prototype = {};
	MapD_render_vega_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.widget_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.vega_json = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.I32) {
	          this.compression_level = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_render_vega_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_render_vega_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.widget_id !== null && this.widget_id !== undefined) {
	    output.writeFieldBegin('widget_id', Thrift.Type.I64, 2);
	    output.writeI64(this.widget_id);
	    output.writeFieldEnd();
	  }
	  if (this.vega_json !== null && this.vega_json !== undefined) {
	    output.writeFieldBegin('vega_json', Thrift.Type.STRING, 3);
	    output.writeString(this.vega_json);
	    output.writeFieldEnd();
	  }
	  if (this.compression_level !== null && this.compression_level !== undefined) {
	    output.writeFieldBegin('compression_level', Thrift.Type.I32, 4);
	    output.writeI32(this.compression_level);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 5);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_render_vega_result = function MapD_render_vega_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TRenderResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_render_vega_result.prototype = {};
	MapD_render_vega_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TRenderResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_render_vega_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_render_vega_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_result_row_for_pixel_args = function MapD_get_result_row_for_pixel_args(args) {
	  this.session = null;
	  this.widget_id = null;
	  this.pixel = null;
	  this.table_col_names = null;
	  this.column_format = null;
	  this.pixelRadius = null;
	  this.nonce = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.widget_id !== undefined && args.widget_id !== null) {
	      this.widget_id = args.widget_id;
	    }
	    if (args.pixel !== undefined && args.pixel !== null) {
	      this.pixel = new ttypes.TPixel(args.pixel);
	    }
	    if (args.table_col_names !== undefined && args.table_col_names !== null) {
	      this.table_col_names = Thrift.copyMap(args.table_col_names, [Thrift.copyList, null]);
	    }
	    if (args.column_format !== undefined && args.column_format !== null) {
	      this.column_format = args.column_format;
	    }
	    if (args.pixelRadius !== undefined && args.pixelRadius !== null) {
	      this.pixelRadius = args.pixelRadius;
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	MapD_get_result_row_for_pixel_args.prototype = {};
	MapD_get_result_row_for_pixel_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.widget_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.pixel = new ttypes.TPixel();
	          this.pixel.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.MAP) {
	          var _size202 = 0;
	          var _rtmp3206;
	          this.table_col_names = {};
	          var _ktype203 = 0;
	          var _vtype204 = 0;
	          _rtmp3206 = input.readMapBegin();
	          _ktype203 = _rtmp3206.ktype;
	          _vtype204 = _rtmp3206.vtype;
	          _size202 = _rtmp3206.size;
	          for (var _i207 = 0; _i207 < _size202; ++_i207) {
	            var key208 = null;
	            var val209 = null;
	            key208 = input.readString();
	            var _size210 = 0;
	            var _rtmp3214;
	            val209 = [];
	            var _etype213 = 0;
	            _rtmp3214 = input.readListBegin();
	            _etype213 = _rtmp3214.etype;
	            _size210 = _rtmp3214.size;
	            for (var _i215 = 0; _i215 < _size210; ++_i215) {
	              var elem216 = null;
	              elem216 = input.readString();
	              val209.push(elem216);
	            }
	            input.readListEnd();
	            this.table_col_names[key208] = val209;
	          }
	          input.readMapEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.BOOL) {
	          this.column_format = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.I32) {
	          this.pixelRadius = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 7:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_result_row_for_pixel_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_result_row_for_pixel_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.widget_id !== null && this.widget_id !== undefined) {
	    output.writeFieldBegin('widget_id', Thrift.Type.I64, 2);
	    output.writeI64(this.widget_id);
	    output.writeFieldEnd();
	  }
	  if (this.pixel !== null && this.pixel !== undefined) {
	    output.writeFieldBegin('pixel', Thrift.Type.STRUCT, 3);
	    this.pixel.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.table_col_names !== null && this.table_col_names !== undefined) {
	    output.writeFieldBegin('table_col_names', Thrift.Type.MAP, 4);
	    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.LIST, Thrift.objectLength(this.table_col_names));
	    for (var kiter217 in this.table_col_names) {
	      if (this.table_col_names.hasOwnProperty(kiter217)) {
	        var viter218 = this.table_col_names[kiter217];
	        output.writeString(kiter217);
	        output.writeListBegin(Thrift.Type.STRING, viter218.length);
	        for (var iter219 in viter218) {
	          if (viter218.hasOwnProperty(iter219)) {
	            iter219 = viter218[iter219];
	            output.writeString(iter219);
	          }
	        }
	        output.writeListEnd();
	      }
	    }
	    output.writeMapEnd();
	    output.writeFieldEnd();
	  }
	  if (this.column_format !== null && this.column_format !== undefined) {
	    output.writeFieldBegin('column_format', Thrift.Type.BOOL, 5);
	    output.writeBool(this.column_format);
	    output.writeFieldEnd();
	  }
	  if (this.pixelRadius !== null && this.pixelRadius !== undefined) {
	    output.writeFieldBegin('pixelRadius', Thrift.Type.I32, 6);
	    output.writeI32(this.pixelRadius);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 7);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_result_row_for_pixel_result = function MapD_get_result_row_for_pixel_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TPixelTableRowResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_result_row_for_pixel_result.prototype = {};
	MapD_get_result_row_for_pixel_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TPixelTableRowResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_result_row_for_pixel_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_result_row_for_pixel_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_frontend_view_args = function MapD_get_frontend_view_args(args) {
	  this.session = null;
	  this.view_name = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.view_name !== undefined && args.view_name !== null) {
	      this.view_name = args.view_name;
	    }
	  }
	};
	MapD_get_frontend_view_args.prototype = {};
	MapD_get_frontend_view_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_frontend_view_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_frontend_view_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.view_name !== null && this.view_name !== undefined) {
	    output.writeFieldBegin('view_name', Thrift.Type.STRING, 2);
	    output.writeString(this.view_name);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_frontend_view_result = function MapD_get_frontend_view_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TFrontendView(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_frontend_view_result.prototype = {};
	MapD_get_frontend_view_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TFrontendView();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_frontend_view_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_frontend_view_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_frontend_views_args = function MapD_get_frontend_views_args(args) {
	  this.session = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	  }
	};
	MapD_get_frontend_views_args.prototype = {};
	MapD_get_frontend_views_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_frontend_views_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_frontend_views_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_frontend_views_result = function MapD_get_frontend_views_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = Thrift.copyList(args.success, [ttypes.TFrontendView]);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_frontend_views_result.prototype = {};
	MapD_get_frontend_views_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.LIST) {
	          var _size220 = 0;
	          var _rtmp3224;
	          this.success = [];
	          var _etype223 = 0;
	          _rtmp3224 = input.readListBegin();
	          _etype223 = _rtmp3224.etype;
	          _size220 = _rtmp3224.size;
	          for (var _i225 = 0; _i225 < _size220; ++_i225) {
	            var elem226 = null;
	            elem226 = new ttypes.TFrontendView();
	            elem226.read(input);
	            this.success.push(elem226);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_frontend_views_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_frontend_views_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
	    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
	    for (var iter227 in this.success) {
	      if (this.success.hasOwnProperty(iter227)) {
	        iter227 = this.success[iter227];
	        iter227.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_create_frontend_view_args = function MapD_create_frontend_view_args(args) {
	  this.session = null;
	  this.view_name = null;
	  this.view_state = null;
	  this.image_hash = null;
	  this.view_metadata = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.view_name !== undefined && args.view_name !== null) {
	      this.view_name = args.view_name;
	    }
	    if (args.view_state !== undefined && args.view_state !== null) {
	      this.view_state = args.view_state;
	    }
	    if (args.image_hash !== undefined && args.image_hash !== null) {
	      this.image_hash = args.image_hash;
	    }
	    if (args.view_metadata !== undefined && args.view_metadata !== null) {
	      this.view_metadata = args.view_metadata;
	    }
	  }
	};
	MapD_create_frontend_view_args.prototype = {};
	MapD_create_frontend_view_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_state = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.image_hash = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_metadata = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_create_frontend_view_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_create_frontend_view_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.view_name !== null && this.view_name !== undefined) {
	    output.writeFieldBegin('view_name', Thrift.Type.STRING, 2);
	    output.writeString(this.view_name);
	    output.writeFieldEnd();
	  }
	  if (this.view_state !== null && this.view_state !== undefined) {
	    output.writeFieldBegin('view_state', Thrift.Type.STRING, 3);
	    output.writeString(this.view_state);
	    output.writeFieldEnd();
	  }
	  if (this.image_hash !== null && this.image_hash !== undefined) {
	    output.writeFieldBegin('image_hash', Thrift.Type.STRING, 4);
	    output.writeString(this.image_hash);
	    output.writeFieldEnd();
	  }
	  if (this.view_metadata !== null && this.view_metadata !== undefined) {
	    output.writeFieldBegin('view_metadata', Thrift.Type.STRING, 5);
	    output.writeString(this.view_metadata);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_create_frontend_view_result = function MapD_create_frontend_view_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_create_frontend_view_result.prototype = {};
	MapD_create_frontend_view_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_create_frontend_view_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_create_frontend_view_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_delete_frontend_view_args = function MapD_delete_frontend_view_args(args) {
	  this.session = null;
	  this.view_name = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.view_name !== undefined && args.view_name !== null) {
	      this.view_name = args.view_name;
	    }
	  }
	};
	MapD_delete_frontend_view_args.prototype = {};
	MapD_delete_frontend_view_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_delete_frontend_view_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_delete_frontend_view_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.view_name !== null && this.view_name !== undefined) {
	    output.writeFieldBegin('view_name', Thrift.Type.STRING, 2);
	    output.writeString(this.view_name);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_delete_frontend_view_result = function MapD_delete_frontend_view_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_delete_frontend_view_result.prototype = {};
	MapD_delete_frontend_view_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_delete_frontend_view_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_delete_frontend_view_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_link_view_args = function MapD_get_link_view_args(args) {
	  this.session = null;
	  this.link = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.link !== undefined && args.link !== null) {
	      this.link = args.link;
	    }
	  }
	};
	MapD_get_link_view_args.prototype = {};
	MapD_get_link_view_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.link = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_link_view_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_link_view_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.link !== null && this.link !== undefined) {
	    output.writeFieldBegin('link', Thrift.Type.STRING, 2);
	    output.writeString(this.link);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_link_view_result = function MapD_get_link_view_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TFrontendView(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_link_view_result.prototype = {};
	MapD_get_link_view_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TFrontendView();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_link_view_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_link_view_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_create_link_args = function MapD_create_link_args(args) {
	  this.session = null;
	  this.view_state = null;
	  this.view_metadata = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.view_state !== undefined && args.view_state !== null) {
	      this.view_state = args.view_state;
	    }
	    if (args.view_metadata !== undefined && args.view_metadata !== null) {
	      this.view_metadata = args.view_metadata;
	    }
	  }
	};
	MapD_create_link_args.prototype = {};
	MapD_create_link_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_state = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.view_metadata = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_create_link_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_create_link_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.view_state !== null && this.view_state !== undefined) {
	    output.writeFieldBegin('view_state', Thrift.Type.STRING, 2);
	    output.writeString(this.view_state);
	    output.writeFieldEnd();
	  }
	  if (this.view_metadata !== null && this.view_metadata !== undefined) {
	    output.writeFieldBegin('view_metadata', Thrift.Type.STRING, 3);
	    output.writeString(this.view_metadata);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_create_link_result = function MapD_create_link_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = args.success;
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_create_link_result.prototype = {};
	MapD_create_link_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRING) {
	          this.success = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_create_link_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_create_link_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
	    output.writeString(this.success);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_load_table_binary_args = function MapD_load_table_binary_args(args) {
	  this.session = null;
	  this.table_name = null;
	  this.rows = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	    if (args.rows !== undefined && args.rows !== null) {
	      this.rows = Thrift.copyList(args.rows, [ttypes.TRow]);
	    }
	  }
	};
	MapD_load_table_binary_args.prototype = {};
	MapD_load_table_binary_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.LIST) {
	          var _size228 = 0;
	          var _rtmp3232;
	          this.rows = [];
	          var _etype231 = 0;
	          _rtmp3232 = input.readListBegin();
	          _etype231 = _rtmp3232.etype;
	          _size228 = _rtmp3232.size;
	          for (var _i233 = 0; _i233 < _size228; ++_i233) {
	            var elem234 = null;
	            elem234 = new ttypes.TRow();
	            elem234.read(input);
	            this.rows.push(elem234);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_load_table_binary_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_load_table_binary_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  if (this.rows !== null && this.rows !== undefined) {
	    output.writeFieldBegin('rows', Thrift.Type.LIST, 3);
	    output.writeListBegin(Thrift.Type.STRUCT, this.rows.length);
	    for (var iter235 in this.rows) {
	      if (this.rows.hasOwnProperty(iter235)) {
	        iter235 = this.rows[iter235];
	        iter235.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_load_table_binary_result = function MapD_load_table_binary_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_load_table_binary_result.prototype = {};
	MapD_load_table_binary_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_load_table_binary_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_load_table_binary_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_load_table_args = function MapD_load_table_args(args) {
	  this.session = null;
	  this.table_name = null;
	  this.rows = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	    if (args.rows !== undefined && args.rows !== null) {
	      this.rows = Thrift.copyList(args.rows, [ttypes.TStringRow]);
	    }
	  }
	};
	MapD_load_table_args.prototype = {};
	MapD_load_table_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.LIST) {
	          var _size236 = 0;
	          var _rtmp3240;
	          this.rows = [];
	          var _etype239 = 0;
	          _rtmp3240 = input.readListBegin();
	          _etype239 = _rtmp3240.etype;
	          _size236 = _rtmp3240.size;
	          for (var _i241 = 0; _i241 < _size236; ++_i241) {
	            var elem242 = null;
	            elem242 = new ttypes.TStringRow();
	            elem242.read(input);
	            this.rows.push(elem242);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_load_table_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_load_table_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  if (this.rows !== null && this.rows !== undefined) {
	    output.writeFieldBegin('rows', Thrift.Type.LIST, 3);
	    output.writeListBegin(Thrift.Type.STRUCT, this.rows.length);
	    for (var iter243 in this.rows) {
	      if (this.rows.hasOwnProperty(iter243)) {
	        iter243 = this.rows[iter243];
	        iter243.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_load_table_result = function MapD_load_table_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_load_table_result.prototype = {};
	MapD_load_table_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_load_table_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_load_table_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_detect_column_types_args = function MapD_detect_column_types_args(args) {
	  this.session = null;
	  this.file_name = null;
	  this.copy_params = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.file_name !== undefined && args.file_name !== null) {
	      this.file_name = args.file_name;
	    }
	    if (args.copy_params !== undefined && args.copy_params !== null) {
	      this.copy_params = new ttypes.TCopyParams(args.copy_params);
	    }
	  }
	};
	MapD_detect_column_types_args.prototype = {};
	MapD_detect_column_types_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.file_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.copy_params = new ttypes.TCopyParams();
	          this.copy_params.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_detect_column_types_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_detect_column_types_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.file_name !== null && this.file_name !== undefined) {
	    output.writeFieldBegin('file_name', Thrift.Type.STRING, 2);
	    output.writeString(this.file_name);
	    output.writeFieldEnd();
	  }
	  if (this.copy_params !== null && this.copy_params !== undefined) {
	    output.writeFieldBegin('copy_params', Thrift.Type.STRUCT, 3);
	    this.copy_params.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_detect_column_types_result = function MapD_detect_column_types_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TDetectResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_detect_column_types_result.prototype = {};
	MapD_detect_column_types_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TDetectResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_detect_column_types_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_detect_column_types_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_create_table_args = function MapD_create_table_args(args) {
	  this.session = null;
	  this.table_name = null;
	  this.row_desc = null;
	  this.table_type = 0;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	    if (args.row_desc !== undefined && args.row_desc !== null) {
	      this.row_desc = Thrift.copyList(args.row_desc, [ttypes.TColumnType]);
	    }
	    if (args.table_type !== undefined && args.table_type !== null) {
	      this.table_type = args.table_type;
	    }
	  }
	};
	MapD_create_table_args.prototype = {};
	MapD_create_table_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.LIST) {
	          var _size244 = 0;
	          var _rtmp3248;
	          this.row_desc = [];
	          var _etype247 = 0;
	          _rtmp3248 = input.readListBegin();
	          _etype247 = _rtmp3248.etype;
	          _size244 = _rtmp3248.size;
	          for (var _i249 = 0; _i249 < _size244; ++_i249) {
	            var elem250 = null;
	            elem250 = new ttypes.TColumnType();
	            elem250.read(input);
	            this.row_desc.push(elem250);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.I32) {
	          this.table_type = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_create_table_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_create_table_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  if (this.row_desc !== null && this.row_desc !== undefined) {
	    output.writeFieldBegin('row_desc', Thrift.Type.LIST, 3);
	    output.writeListBegin(Thrift.Type.STRUCT, this.row_desc.length);
	    for (var iter251 in this.row_desc) {
	      if (this.row_desc.hasOwnProperty(iter251)) {
	        iter251 = this.row_desc[iter251];
	        iter251.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.table_type !== null && this.table_type !== undefined) {
	    output.writeFieldBegin('table_type', Thrift.Type.I32, 4);
	    output.writeI32(this.table_type);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_create_table_result = function MapD_create_table_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_create_table_result.prototype = {};
	MapD_create_table_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_create_table_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_create_table_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_import_table_args = function MapD_import_table_args(args) {
	  this.session = null;
	  this.table_name = null;
	  this.file_name = null;
	  this.copy_params = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	    if (args.file_name !== undefined && args.file_name !== null) {
	      this.file_name = args.file_name;
	    }
	    if (args.copy_params !== undefined && args.copy_params !== null) {
	      this.copy_params = new ttypes.TCopyParams(args.copy_params);
	    }
	  }
	};
	MapD_import_table_args.prototype = {};
	MapD_import_table_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.file_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.copy_params = new ttypes.TCopyParams();
	          this.copy_params.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_import_table_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_import_table_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  if (this.file_name !== null && this.file_name !== undefined) {
	    output.writeFieldBegin('file_name', Thrift.Type.STRING, 3);
	    output.writeString(this.file_name);
	    output.writeFieldEnd();
	  }
	  if (this.copy_params !== null && this.copy_params !== undefined) {
	    output.writeFieldBegin('copy_params', Thrift.Type.STRUCT, 4);
	    this.copy_params.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_import_table_result = function MapD_import_table_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_import_table_result.prototype = {};
	MapD_import_table_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_import_table_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_import_table_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_import_geo_table_args = function MapD_import_geo_table_args(args) {
	  this.session = null;
	  this.table_name = null;
	  this.file_name = null;
	  this.copy_params = null;
	  this.row_desc = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	    if (args.file_name !== undefined && args.file_name !== null) {
	      this.file_name = args.file_name;
	    }
	    if (args.copy_params !== undefined && args.copy_params !== null) {
	      this.copy_params = new ttypes.TCopyParams(args.copy_params);
	    }
	    if (args.row_desc !== undefined && args.row_desc !== null) {
	      this.row_desc = Thrift.copyList(args.row_desc, [ttypes.TColumnType]);
	    }
	  }
	};
	MapD_import_geo_table_args.prototype = {};
	MapD_import_geo_table_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.file_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.copy_params = new ttypes.TCopyParams();
	          this.copy_params.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.LIST) {
	          var _size252 = 0;
	          var _rtmp3256;
	          this.row_desc = [];
	          var _etype255 = 0;
	          _rtmp3256 = input.readListBegin();
	          _etype255 = _rtmp3256.etype;
	          _size252 = _rtmp3256.size;
	          for (var _i257 = 0; _i257 < _size252; ++_i257) {
	            var elem258 = null;
	            elem258 = new ttypes.TColumnType();
	            elem258.read(input);
	            this.row_desc.push(elem258);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_import_geo_table_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_import_geo_table_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  if (this.file_name !== null && this.file_name !== undefined) {
	    output.writeFieldBegin('file_name', Thrift.Type.STRING, 3);
	    output.writeString(this.file_name);
	    output.writeFieldEnd();
	  }
	  if (this.copy_params !== null && this.copy_params !== undefined) {
	    output.writeFieldBegin('copy_params', Thrift.Type.STRUCT, 4);
	    this.copy_params.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.row_desc !== null && this.row_desc !== undefined) {
	    output.writeFieldBegin('row_desc', Thrift.Type.LIST, 5);
	    output.writeListBegin(Thrift.Type.STRUCT, this.row_desc.length);
	    for (var iter259 in this.row_desc) {
	      if (this.row_desc.hasOwnProperty(iter259)) {
	        iter259 = this.row_desc[iter259];
	        iter259.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_import_geo_table_result = function MapD_import_geo_table_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_import_geo_table_result.prototype = {};
	MapD_import_geo_table_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_import_geo_table_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_import_geo_table_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_import_table_status_args = function MapD_import_table_status_args(args) {
	  this.session = null;
	  this.import_id = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.import_id !== undefined && args.import_id !== null) {
	      this.import_id = args.import_id;
	    }
	  }
	};
	MapD_import_table_status_args.prototype = {};
	MapD_import_table_status_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.import_id = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_import_table_status_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_import_table_status_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.import_id !== null && this.import_id !== undefined) {
	    output.writeFieldBegin('import_id', Thrift.Type.STRING, 2);
	    output.writeString(this.import_id);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_import_table_status_result = function MapD_import_table_status_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TImportStatus(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_import_table_status_result.prototype = {};
	MapD_import_table_status_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TImportStatus();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_import_table_status_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_import_table_status_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_start_query_args = function MapD_start_query_args(args) {
	  this.session = null;
	  this.query_ra = null;
	  this.just_explain = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.query_ra !== undefined && args.query_ra !== null) {
	      this.query_ra = args.query_ra;
	    }
	    if (args.just_explain !== undefined && args.just_explain !== null) {
	      this.just_explain = args.just_explain;
	    }
	  }
	};
	MapD_start_query_args.prototype = {};
	MapD_start_query_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.query_ra = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.BOOL) {
	          this.just_explain = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_start_query_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_start_query_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.query_ra !== null && this.query_ra !== undefined) {
	    output.writeFieldBegin('query_ra', Thrift.Type.STRING, 2);
	    output.writeString(this.query_ra);
	    output.writeFieldEnd();
	  }
	  if (this.just_explain !== null && this.just_explain !== undefined) {
	    output.writeFieldBegin('just_explain', Thrift.Type.BOOL, 3);
	    output.writeBool(this.just_explain);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_start_query_result = function MapD_start_query_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TPendingQuery(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_start_query_result.prototype = {};
	MapD_start_query_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TPendingQuery();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_start_query_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_start_query_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_execute_first_step_args = function MapD_execute_first_step_args(args) {
	  this.pending_query = null;
	  if (args) {
	    if (args.pending_query !== undefined && args.pending_query !== null) {
	      this.pending_query = new ttypes.TPendingQuery(args.pending_query);
	    }
	  }
	};
	MapD_execute_first_step_args.prototype = {};
	MapD_execute_first_step_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.pending_query = new ttypes.TPendingQuery();
	          this.pending_query.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_execute_first_step_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_execute_first_step_args');
	  if (this.pending_query !== null && this.pending_query !== undefined) {
	    output.writeFieldBegin('pending_query', Thrift.Type.STRUCT, 1);
	    this.pending_query.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_execute_first_step_result = function MapD_execute_first_step_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TStepResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_execute_first_step_result.prototype = {};
	MapD_execute_first_step_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TStepResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_execute_first_step_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_execute_first_step_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_broadcast_serialized_rows_args = function MapD_broadcast_serialized_rows_args(args) {
	  this.serialized_rows = null;
	  this.row_desc = null;
	  this.query_id = null;
	  if (args) {
	    if (args.serialized_rows !== undefined && args.serialized_rows !== null) {
	      this.serialized_rows = args.serialized_rows;
	    }
	    if (args.row_desc !== undefined && args.row_desc !== null) {
	      this.row_desc = Thrift.copyList(args.row_desc, [ttypes.TColumnType]);
	    }
	    if (args.query_id !== undefined && args.query_id !== null) {
	      this.query_id = args.query_id;
	    }
	  }
	};
	MapD_broadcast_serialized_rows_args.prototype = {};
	MapD_broadcast_serialized_rows_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.serialized_rows = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.LIST) {
	          var _size260 = 0;
	          var _rtmp3264;
	          this.row_desc = [];
	          var _etype263 = 0;
	          _rtmp3264 = input.readListBegin();
	          _etype263 = _rtmp3264.etype;
	          _size260 = _rtmp3264.size;
	          for (var _i265 = 0; _i265 < _size260; ++_i265) {
	            var elem266 = null;
	            elem266 = new ttypes.TColumnType();
	            elem266.read(input);
	            this.row_desc.push(elem266);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.I64) {
	          this.query_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_broadcast_serialized_rows_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_broadcast_serialized_rows_args');
	  if (this.serialized_rows !== null && this.serialized_rows !== undefined) {
	    output.writeFieldBegin('serialized_rows', Thrift.Type.STRING, 1);
	    output.writeString(this.serialized_rows);
	    output.writeFieldEnd();
	  }
	  if (this.row_desc !== null && this.row_desc !== undefined) {
	    output.writeFieldBegin('row_desc', Thrift.Type.LIST, 2);
	    output.writeListBegin(Thrift.Type.STRUCT, this.row_desc.length);
	    for (var iter267 in this.row_desc) {
	      if (this.row_desc.hasOwnProperty(iter267)) {
	        iter267 = this.row_desc[iter267];
	        iter267.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.query_id !== null && this.query_id !== undefined) {
	    output.writeFieldBegin('query_id', Thrift.Type.I64, 3);
	    output.writeI64(this.query_id);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_broadcast_serialized_rows_result = function MapD_broadcast_serialized_rows_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_broadcast_serialized_rows_result.prototype = {};
	MapD_broadcast_serialized_rows_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_broadcast_serialized_rows_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_broadcast_serialized_rows_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_render_vega_raw_pixels_args = function MapD_render_vega_raw_pixels_args(args) {
	  this.session = null;
	  this.widget_id = null;
	  this.vega_json = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.widget_id !== undefined && args.widget_id !== null) {
	      this.widget_id = args.widget_id;
	    }
	    if (args.vega_json !== undefined && args.vega_json !== null) {
	      this.vega_json = args.vega_json;
	    }
	  }
	};
	MapD_render_vega_raw_pixels_args.prototype = {};
	MapD_render_vega_raw_pixels_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.widget_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.vega_json = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_render_vega_raw_pixels_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_render_vega_raw_pixels_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.widget_id !== null && this.widget_id !== undefined) {
	    output.writeFieldBegin('widget_id', Thrift.Type.I64, 2);
	    output.writeI64(this.widget_id);
	    output.writeFieldEnd();
	  }
	  if (this.vega_json !== null && this.vega_json !== undefined) {
	    output.writeFieldBegin('vega_json', Thrift.Type.STRING, 3);
	    output.writeString(this.vega_json);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_render_vega_raw_pixels_result = function MapD_render_vega_raw_pixels_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TRawPixelDataResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_render_vega_raw_pixels_result.prototype = {};
	MapD_render_vega_raw_pixels_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TRawPixelDataResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_render_vega_raw_pixels_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_render_vega_raw_pixels_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_insert_data_args = function MapD_insert_data_args(args) {
	  this.session = null;
	  this.insert_data = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.insert_data !== undefined && args.insert_data !== null) {
	      this.insert_data = new ttypes.TInsertData(args.insert_data);
	    }
	  }
	};
	MapD_insert_data_args.prototype = {};
	MapD_insert_data_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.insert_data = new ttypes.TInsertData();
	          this.insert_data.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_insert_data_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_insert_data_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.insert_data !== null && this.insert_data !== undefined) {
	    output.writeFieldBegin('insert_data', Thrift.Type.STRUCT, 2);
	    this.insert_data.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_insert_data_result = function MapD_insert_data_result(args) {
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_insert_data_result.prototype = {};
	MapD_insert_data_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 0:
	        input.skip(ftype);
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_insert_data_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_insert_data_result');
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_table_descriptor_args = function MapD_get_table_descriptor_args(args) {
	  this.session = null;
	  this.table_name = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	  }
	};
	MapD_get_table_descriptor_args.prototype = {};
	MapD_get_table_descriptor_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_table_descriptor_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_table_descriptor_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_table_descriptor_result = function MapD_get_table_descriptor_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = Thrift.copyMap(args.success, [ttypes.TColumnType]);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_table_descriptor_result.prototype = {};
	MapD_get_table_descriptor_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.MAP) {
	          var _size268 = 0;
	          var _rtmp3272;
	          this.success = {};
	          var _ktype269 = 0;
	          var _vtype270 = 0;
	          _rtmp3272 = input.readMapBegin();
	          _ktype269 = _rtmp3272.ktype;
	          _vtype270 = _rtmp3272.vtype;
	          _size268 = _rtmp3272.size;
	          for (var _i273 = 0; _i273 < _size268; ++_i273) {
	            var key274 = null;
	            var val275 = null;
	            key274 = input.readString();
	            val275 = new ttypes.TColumnType();
	            val275.read(input);
	            this.success[key274] = val275;
	          }
	          input.readMapEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_table_descriptor_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_table_descriptor_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.MAP, 0);
	    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRUCT, Thrift.objectLength(this.success));
	    for (var kiter276 in this.success) {
	      if (this.success.hasOwnProperty(kiter276)) {
	        var viter277 = this.success[kiter276];
	        output.writeString(kiter276);
	        viter277.write(output);
	      }
	    }
	    output.writeMapEnd();
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_row_descriptor_args = function MapD_get_row_descriptor_args(args) {
	  this.session = null;
	  this.table_name = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	  }
	};
	MapD_get_row_descriptor_args.prototype = {};
	MapD_get_row_descriptor_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_row_descriptor_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_row_descriptor_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 2);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_row_descriptor_result = function MapD_get_row_descriptor_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = Thrift.copyList(args.success, [ttypes.TColumnType]);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_row_descriptor_result.prototype = {};
	MapD_get_row_descriptor_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.LIST) {
	          var _size278 = 0;
	          var _rtmp3282;
	          this.success = [];
	          var _etype281 = 0;
	          _rtmp3282 = input.readListBegin();
	          _etype281 = _rtmp3282.etype;
	          _size278 = _rtmp3282.size;
	          for (var _i283 = 0; _i283 < _size278; ++_i283) {
	            var elem284 = null;
	            elem284 = new ttypes.TColumnType();
	            elem284.read(input);
	            this.success.push(elem284);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_row_descriptor_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_row_descriptor_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
	    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
	    for (var iter285 in this.success) {
	      if (this.success.hasOwnProperty(iter285)) {
	        iter285 = this.success[iter285];
	        iter285.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_render_args = function MapD_render_args(args) {
	  this.session = null;
	  this.query = null;
	  this.render_type = null;
	  this.nonce = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.query !== undefined && args.query !== null) {
	      this.query = args.query;
	    }
	    if (args.render_type !== undefined && args.render_type !== null) {
	      this.render_type = args.render_type;
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	MapD_render_args.prototype = {};
	MapD_render_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.STRING) {
	          this.query = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRING) {
	          this.render_type = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_render_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_render_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.query !== null && this.query !== undefined) {
	    output.writeFieldBegin('query', Thrift.Type.STRING, 2);
	    output.writeString(this.query);
	    output.writeFieldEnd();
	  }
	  if (this.render_type !== null && this.render_type !== undefined) {
	    output.writeFieldBegin('render_type', Thrift.Type.STRING, 3);
	    output.writeString(this.render_type);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 4);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_render_result = function MapD_render_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TRenderResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_render_result.prototype = {};
	MapD_render_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TRenderResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_render_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_render_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_rows_for_pixels_args = function MapD_get_rows_for_pixels_args(args) {
	  this.session = null;
	  this.widget_id = null;
	  this.pixels = null;
	  this.table_name = null;
	  this.col_names = null;
	  this.column_format = null;
	  this.nonce = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.widget_id !== undefined && args.widget_id !== null) {
	      this.widget_id = args.widget_id;
	    }
	    if (args.pixels !== undefined && args.pixels !== null) {
	      this.pixels = Thrift.copyList(args.pixels, [ttypes.TPixel]);
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	    if (args.col_names !== undefined && args.col_names !== null) {
	      this.col_names = Thrift.copyList(args.col_names, [null]);
	    }
	    if (args.column_format !== undefined && args.column_format !== null) {
	      this.column_format = args.column_format;
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	MapD_get_rows_for_pixels_args.prototype = {};
	MapD_get_rows_for_pixels_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.widget_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.LIST) {
	          var _size286 = 0;
	          var _rtmp3290;
	          this.pixels = [];
	          var _etype289 = 0;
	          _rtmp3290 = input.readListBegin();
	          _etype289 = _rtmp3290.etype;
	          _size286 = _rtmp3290.size;
	          for (var _i291 = 0; _i291 < _size286; ++_i291) {
	            var elem292 = null;
	            elem292 = new ttypes.TPixel();
	            elem292.read(input);
	            this.pixels.push(elem292);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.LIST) {
	          var _size293 = 0;
	          var _rtmp3297;
	          this.col_names = [];
	          var _etype296 = 0;
	          _rtmp3297 = input.readListBegin();
	          _etype296 = _rtmp3297.etype;
	          _size293 = _rtmp3297.size;
	          for (var _i298 = 0; _i298 < _size293; ++_i298) {
	            var elem299 = null;
	            elem299 = input.readString();
	            this.col_names.push(elem299);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.BOOL) {
	          this.column_format = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 7:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_rows_for_pixels_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_rows_for_pixels_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.widget_id !== null && this.widget_id !== undefined) {
	    output.writeFieldBegin('widget_id', Thrift.Type.I64, 2);
	    output.writeI64(this.widget_id);
	    output.writeFieldEnd();
	  }
	  if (this.pixels !== null && this.pixels !== undefined) {
	    output.writeFieldBegin('pixels', Thrift.Type.LIST, 3);
	    output.writeListBegin(Thrift.Type.STRUCT, this.pixels.length);
	    for (var iter300 in this.pixels) {
	      if (this.pixels.hasOwnProperty(iter300)) {
	        iter300 = this.pixels[iter300];
	        iter300.write(output);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 4);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  if (this.col_names !== null && this.col_names !== undefined) {
	    output.writeFieldBegin('col_names', Thrift.Type.LIST, 5);
	    output.writeListBegin(Thrift.Type.STRING, this.col_names.length);
	    for (var iter301 in this.col_names) {
	      if (this.col_names.hasOwnProperty(iter301)) {
	        iter301 = this.col_names[iter301];
	        output.writeString(iter301);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.column_format !== null && this.column_format !== undefined) {
	    output.writeFieldBegin('column_format', Thrift.Type.BOOL, 6);
	    output.writeBool(this.column_format);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 7);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_rows_for_pixels_result = function MapD_get_rows_for_pixels_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TPixelResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_rows_for_pixels_result.prototype = {};
	MapD_get_rows_for_pixels_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TPixelResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_rows_for_pixels_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_rows_for_pixels_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_row_for_pixel_args = function MapD_get_row_for_pixel_args(args) {
	  this.session = null;
	  this.widget_id = null;
	  this.pixel = null;
	  this.table_name = null;
	  this.col_names = null;
	  this.column_format = null;
	  this.pixelRadius = null;
	  this.nonce = null;
	  if (args) {
	    if (args.session !== undefined && args.session !== null) {
	      this.session = args.session;
	    }
	    if (args.widget_id !== undefined && args.widget_id !== null) {
	      this.widget_id = args.widget_id;
	    }
	    if (args.pixel !== undefined && args.pixel !== null) {
	      this.pixel = new ttypes.TPixel(args.pixel);
	    }
	    if (args.table_name !== undefined && args.table_name !== null) {
	      this.table_name = args.table_name;
	    }
	    if (args.col_names !== undefined && args.col_names !== null) {
	      this.col_names = Thrift.copyList(args.col_names, [null]);
	    }
	    if (args.column_format !== undefined && args.column_format !== null) {
	      this.column_format = args.column_format;
	    }
	    if (args.pixelRadius !== undefined && args.pixelRadius !== null) {
	      this.pixelRadius = args.pixelRadius;
	    }
	    if (args.nonce !== undefined && args.nonce !== null) {
	      this.nonce = args.nonce;
	    }
	  }
	};
	MapD_get_row_for_pixel_args.prototype = {};
	MapD_get_row_for_pixel_args.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 1:
	        if (ftype == Thrift.Type.STRING) {
	          this.session = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 2:
	        if (ftype == Thrift.Type.I64) {
	          this.widget_id = input.readI64();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 3:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.pixel = new ttypes.TPixel();
	          this.pixel.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 4:
	        if (ftype == Thrift.Type.STRING) {
	          this.table_name = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 5:
	        if (ftype == Thrift.Type.LIST) {
	          var _size302 = 0;
	          var _rtmp3306;
	          this.col_names = [];
	          var _etype305 = 0;
	          _rtmp3306 = input.readListBegin();
	          _etype305 = _rtmp3306.etype;
	          _size302 = _rtmp3306.size;
	          for (var _i307 = 0; _i307 < _size302; ++_i307) {
	            var elem308 = null;
	            elem308 = input.readString();
	            this.col_names.push(elem308);
	          }
	          input.readListEnd();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 6:
	        if (ftype == Thrift.Type.BOOL) {
	          this.column_format = input.readBool();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 7:
	        if (ftype == Thrift.Type.I32) {
	          this.pixelRadius = input.readI32();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 8:
	        if (ftype == Thrift.Type.STRING) {
	          this.nonce = input.readString();
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_row_for_pixel_args.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_row_for_pixel_args');
	  if (this.session !== null && this.session !== undefined) {
	    output.writeFieldBegin('session', Thrift.Type.STRING, 1);
	    output.writeString(this.session);
	    output.writeFieldEnd();
	  }
	  if (this.widget_id !== null && this.widget_id !== undefined) {
	    output.writeFieldBegin('widget_id', Thrift.Type.I64, 2);
	    output.writeI64(this.widget_id);
	    output.writeFieldEnd();
	  }
	  if (this.pixel !== null && this.pixel !== undefined) {
	    output.writeFieldBegin('pixel', Thrift.Type.STRUCT, 3);
	    this.pixel.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.table_name !== null && this.table_name !== undefined) {
	    output.writeFieldBegin('table_name', Thrift.Type.STRING, 4);
	    output.writeString(this.table_name);
	    output.writeFieldEnd();
	  }
	  if (this.col_names !== null && this.col_names !== undefined) {
	    output.writeFieldBegin('col_names', Thrift.Type.LIST, 5);
	    output.writeListBegin(Thrift.Type.STRING, this.col_names.length);
	    for (var iter309 in this.col_names) {
	      if (this.col_names.hasOwnProperty(iter309)) {
	        iter309 = this.col_names[iter309];
	        output.writeString(iter309);
	      }
	    }
	    output.writeListEnd();
	    output.writeFieldEnd();
	  }
	  if (this.column_format !== null && this.column_format !== undefined) {
	    output.writeFieldBegin('column_format', Thrift.Type.BOOL, 6);
	    output.writeBool(this.column_format);
	    output.writeFieldEnd();
	  }
	  if (this.pixelRadius !== null && this.pixelRadius !== undefined) {
	    output.writeFieldBegin('pixelRadius', Thrift.Type.I32, 7);
	    output.writeI32(this.pixelRadius);
	    output.writeFieldEnd();
	  }
	  if (this.nonce !== null && this.nonce !== undefined) {
	    output.writeFieldBegin('nonce', Thrift.Type.STRING, 8);
	    output.writeString(this.nonce);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapD_get_row_for_pixel_result = function MapD_get_row_for_pixel_result(args) {
	  this.success = null;
	  this.e = null;
	  if (args instanceof ttypes.TMapDException) {
	    this.e = args;
	    return;
	  }
	  if (args) {
	    if (args.success !== undefined && args.success !== null) {
	      this.success = new ttypes.TPixelRowResult(args.success);
	    }
	    if (args.e !== undefined && args.e !== null) {
	      this.e = args.e;
	    }
	  }
	};
	MapD_get_row_for_pixel_result.prototype = {};
	MapD_get_row_for_pixel_result.prototype.read = function (input) {
	  input.readStructBegin();
	  while (true) {
	    var ret = input.readFieldBegin();
	    var fname = ret.fname;
	    var ftype = ret.ftype;
	    var fid = ret.fid;
	    if (ftype == Thrift.Type.STOP) {
	      break;
	    }
	    switch (fid) {
	      case 0:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.success = new ttypes.TPixelRowResult();
	          this.success.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      case 1:
	        if (ftype == Thrift.Type.STRUCT) {
	          this.e = new ttypes.TMapDException();
	          this.e.read(input);
	        } else {
	          input.skip(ftype);
	        }
	        break;
	      default:
	        input.skip(ftype);
	    }
	    input.readFieldEnd();
	  }
	  input.readStructEnd();
	  return;
	};

	MapD_get_row_for_pixel_result.prototype.write = function (output) {
	  output.writeStructBegin('MapD_get_row_for_pixel_result');
	  if (this.success !== null && this.success !== undefined) {
	    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
	    this.success.write(output);
	    output.writeFieldEnd();
	  }
	  if (this.e !== null && this.e !== undefined) {
	    output.writeFieldBegin('e', Thrift.Type.STRUCT, 1);
	    this.e.write(output);
	    output.writeFieldEnd();
	  }
	  output.writeFieldStop();
	  output.writeStructEnd();
	  return;
	};

	var MapDClient = exports.Client = function (output, pClass) {
	  this.output = output;
	  this.pClass = pClass;
	  this._seqid = 0;
	  this._reqs = {};
	};
	MapDClient.prototype = {};
	MapDClient.prototype.seqid = function () {
	  return this._seqid;
	};
	MapDClient.prototype.new_seqid = function () {
	  return this._seqid += 1;
	};
	MapDClient.prototype.connect = function (user, passwd, dbname, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_connect(user, passwd, dbname);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_connect(user, passwd, dbname);
	  }
	};

	MapDClient.prototype.send_connect = function (user, passwd, dbname) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('connect', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_connect_args();
	  args.user = user;
	  args.passwd = passwd;
	  args.dbname = dbname;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_connect = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_connect_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('connect failed: unknown result');
	};
	MapDClient.prototype.disconnect = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_disconnect(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_disconnect(session);
	  }
	};

	MapDClient.prototype.send_disconnect = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('disconnect', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_disconnect_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_disconnect = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_disconnect_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.get_server_status = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_server_status(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_server_status(session);
	  }
	};

	MapDClient.prototype.send_get_server_status = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_server_status', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_server_status_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_server_status = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_server_status_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_server_status failed: unknown result');
	};
	MapDClient.prototype.get_tables = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_tables(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_tables(session);
	  }
	};

	MapDClient.prototype.send_get_tables = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_tables', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_tables_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_tables = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_tables_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_tables failed: unknown result');
	};
	MapDClient.prototype.get_table_details = function (session, table_name, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_table_details(session, table_name);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_table_details(session, table_name);
	  }
	};

	MapDClient.prototype.send_get_table_details = function (session, table_name) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_table_details', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_table_details_args();
	  args.session = session;
	  args.table_name = table_name;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_table_details = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_table_details_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_table_details failed: unknown result');
	};
	MapDClient.prototype.get_users = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_users(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_users(session);
	  }
	};

	MapDClient.prototype.send_get_users = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_users', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_users_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_users = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_users_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_users failed: unknown result');
	};
	MapDClient.prototype.get_databases = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_databases(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_databases(session);
	  }
	};

	MapDClient.prototype.send_get_databases = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_databases', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_databases_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_databases = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_databases_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_databases failed: unknown result');
	};
	MapDClient.prototype.get_version = function (callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_version();
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_version();
	  }
	};

	MapDClient.prototype.send_get_version = function () {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_version', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_version_args();
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_version = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_version_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_version failed: unknown result');
	};
	MapDClient.prototype.start_heap_profile = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_start_heap_profile(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_start_heap_profile(session);
	  }
	};

	MapDClient.prototype.send_start_heap_profile = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('start_heap_profile', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_start_heap_profile_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_start_heap_profile = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_start_heap_profile_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.stop_heap_profile = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_stop_heap_profile(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_stop_heap_profile(session);
	  }
	};

	MapDClient.prototype.send_stop_heap_profile = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('stop_heap_profile', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_stop_heap_profile_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_stop_heap_profile = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_stop_heap_profile_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.get_heap_profile = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_heap_profile(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_heap_profile(session);
	  }
	};

	MapDClient.prototype.send_get_heap_profile = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_heap_profile', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_heap_profile_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_heap_profile = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_heap_profile_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_heap_profile failed: unknown result');
	};
	MapDClient.prototype.get_memory_gpu = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_memory_gpu(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_memory_gpu(session);
	  }
	};

	MapDClient.prototype.send_get_memory_gpu = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_memory_gpu', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_memory_gpu_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_memory_gpu = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_memory_gpu_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_memory_gpu failed: unknown result');
	};
	MapDClient.prototype.get_memory_summary = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_memory_summary(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_memory_summary(session);
	  }
	};

	MapDClient.prototype.send_get_memory_summary = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_memory_summary', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_memory_summary_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_memory_summary = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_memory_summary_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_memory_summary failed: unknown result');
	};
	MapDClient.prototype.clear_cpu_memory = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_clear_cpu_memory(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_clear_cpu_memory(session);
	  }
	};

	MapDClient.prototype.send_clear_cpu_memory = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('clear_cpu_memory', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_clear_cpu_memory_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_clear_cpu_memory = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_clear_cpu_memory_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.clear_gpu_memory = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_clear_gpu_memory(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_clear_gpu_memory(session);
	  }
	};

	MapDClient.prototype.send_clear_gpu_memory = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('clear_gpu_memory', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_clear_gpu_memory_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_clear_gpu_memory = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_clear_gpu_memory_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.sql_execute = function (session, query, column_format, nonce, first_n, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_sql_execute(session, query, column_format, nonce, first_n);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_sql_execute(session, query, column_format, nonce, first_n);
	  }
	};

	MapDClient.prototype.send_sql_execute = function (session, query, column_format, nonce, first_n) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('sql_execute', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_sql_execute_args();
	  args.session = session;
	  args.query = query;
	  args.column_format = column_format;
	  args.nonce = nonce;
	  args.first_n = first_n;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_sql_execute = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_sql_execute_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('sql_execute failed: unknown result');
	};
	MapDClient.prototype.interrupt = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_interrupt(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_interrupt(session);
	  }
	};

	MapDClient.prototype.send_interrupt = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('interrupt', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_interrupt_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_interrupt = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_interrupt_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.sql_validate = function (session, query, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_sql_validate(session, query);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_sql_validate(session, query);
	  }
	};

	MapDClient.prototype.send_sql_validate = function (session, query) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('sql_validate', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_sql_validate_args();
	  args.session = session;
	  args.query = query;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_sql_validate = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_sql_validate_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('sql_validate failed: unknown result');
	};
	MapDClient.prototype.set_execution_mode = function (session, mode, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_set_execution_mode(session, mode);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_set_execution_mode(session, mode);
	  }
	};

	MapDClient.prototype.send_set_execution_mode = function (session, mode) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('set_execution_mode', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_set_execution_mode_args();
	  args.session = session;
	  args.mode = mode;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_set_execution_mode = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_set_execution_mode_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.render_vega = function (session, widget_id, vega_json, compression_level, nonce, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_render_vega(session, widget_id, vega_json, compression_level, nonce);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_render_vega(session, widget_id, vega_json, compression_level, nonce);
	  }
	};

	MapDClient.prototype.send_render_vega = function (session, widget_id, vega_json, compression_level, nonce) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('render_vega', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_render_vega_args();
	  args.session = session;
	  args.widget_id = widget_id;
	  args.vega_json = vega_json;
	  args.compression_level = compression_level;
	  args.nonce = nonce;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_render_vega = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_render_vega_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('render_vega failed: unknown result');
	};
	MapDClient.prototype.get_result_row_for_pixel = function (session, widget_id, pixel, table_col_names, column_format, pixelRadius, nonce, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_result_row_for_pixel(session, widget_id, pixel, table_col_names, column_format, pixelRadius, nonce);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_result_row_for_pixel(session, widget_id, pixel, table_col_names, column_format, pixelRadius, nonce);
	  }
	};

	MapDClient.prototype.send_get_result_row_for_pixel = function (session, widget_id, pixel, table_col_names, column_format, pixelRadius, nonce) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_result_row_for_pixel', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_result_row_for_pixel_args();
	  args.session = session;
	  args.widget_id = widget_id;
	  args.pixel = pixel;
	  args.table_col_names = table_col_names;
	  args.column_format = column_format;
	  args.pixelRadius = pixelRadius;
	  args.nonce = nonce;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_result_row_for_pixel = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_result_row_for_pixel_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_result_row_for_pixel failed: unknown result');
	};
	MapDClient.prototype.get_frontend_view = function (session, view_name, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_frontend_view(session, view_name);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_frontend_view(session, view_name);
	  }
	};

	MapDClient.prototype.send_get_frontend_view = function (session, view_name) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_frontend_view', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_frontend_view_args();
	  args.session = session;
	  args.view_name = view_name;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_frontend_view = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_frontend_view_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_frontend_view failed: unknown result');
	};
	MapDClient.prototype.get_frontend_views = function (session, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_frontend_views(session);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_frontend_views(session);
	  }
	};

	MapDClient.prototype.send_get_frontend_views = function (session) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_frontend_views', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_frontend_views_args();
	  args.session = session;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_frontend_views = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_frontend_views_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_frontend_views failed: unknown result');
	};
	MapDClient.prototype.create_frontend_view = function (session, view_name, view_state, image_hash, view_metadata, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_create_frontend_view(session, view_name, view_state, image_hash, view_metadata);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_create_frontend_view(session, view_name, view_state, image_hash, view_metadata);
	  }
	};

	MapDClient.prototype.send_create_frontend_view = function (session, view_name, view_state, image_hash, view_metadata) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('create_frontend_view', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_create_frontend_view_args();
	  args.session = session;
	  args.view_name = view_name;
	  args.view_state = view_state;
	  args.image_hash = image_hash;
	  args.view_metadata = view_metadata;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_create_frontend_view = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_create_frontend_view_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.delete_frontend_view = function (session, view_name, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_delete_frontend_view(session, view_name);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_delete_frontend_view(session, view_name);
	  }
	};

	MapDClient.prototype.send_delete_frontend_view = function (session, view_name) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('delete_frontend_view', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_delete_frontend_view_args();
	  args.session = session;
	  args.view_name = view_name;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_delete_frontend_view = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_delete_frontend_view_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.get_link_view = function (session, link, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_link_view(session, link);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_link_view(session, link);
	  }
	};

	MapDClient.prototype.send_get_link_view = function (session, link) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_link_view', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_link_view_args();
	  args.session = session;
	  args.link = link;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_link_view = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_link_view_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_link_view failed: unknown result');
	};
	MapDClient.prototype.create_link = function (session, view_state, view_metadata, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_create_link(session, view_state, view_metadata);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_create_link(session, view_state, view_metadata);
	  }
	};

	MapDClient.prototype.send_create_link = function (session, view_state, view_metadata) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('create_link', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_create_link_args();
	  args.session = session;
	  args.view_state = view_state;
	  args.view_metadata = view_metadata;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_create_link = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_create_link_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('create_link failed: unknown result');
	};
	MapDClient.prototype.load_table_binary = function (session, table_name, rows, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_load_table_binary(session, table_name, rows);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_load_table_binary(session, table_name, rows);
	  }
	};

	MapDClient.prototype.send_load_table_binary = function (session, table_name, rows) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('load_table_binary', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_load_table_binary_args();
	  args.session = session;
	  args.table_name = table_name;
	  args.rows = rows;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_load_table_binary = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_load_table_binary_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.load_table = function (session, table_name, rows, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_load_table(session, table_name, rows);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_load_table(session, table_name, rows);
	  }
	};

	MapDClient.prototype.send_load_table = function (session, table_name, rows) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('load_table', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_load_table_args();
	  args.session = session;
	  args.table_name = table_name;
	  args.rows = rows;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_load_table = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_load_table_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.detect_column_types = function (session, file_name, copy_params, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_detect_column_types(session, file_name, copy_params);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_detect_column_types(session, file_name, copy_params);
	  }
	};

	MapDClient.prototype.send_detect_column_types = function (session, file_name, copy_params) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('detect_column_types', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_detect_column_types_args();
	  args.session = session;
	  args.file_name = file_name;
	  args.copy_params = copy_params;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_detect_column_types = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_detect_column_types_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('detect_column_types failed: unknown result');
	};
	MapDClient.prototype.create_table = function (session, table_name, row_desc, table_type, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_create_table(session, table_name, row_desc, table_type);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_create_table(session, table_name, row_desc, table_type);
	  }
	};

	MapDClient.prototype.send_create_table = function (session, table_name, row_desc, table_type) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('create_table', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_create_table_args();
	  args.session = session;
	  args.table_name = table_name;
	  args.row_desc = row_desc;
	  args.table_type = table_type;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_create_table = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_create_table_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.import_table = function (session, table_name, file_name, copy_params, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_import_table(session, table_name, file_name, copy_params);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_import_table(session, table_name, file_name, copy_params);
	  }
	};

	MapDClient.prototype.send_import_table = function (session, table_name, file_name, copy_params) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('import_table', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_import_table_args();
	  args.session = session;
	  args.table_name = table_name;
	  args.file_name = file_name;
	  args.copy_params = copy_params;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_import_table = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_import_table_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.import_geo_table = function (session, table_name, file_name, copy_params, row_desc, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_import_geo_table(session, table_name, file_name, copy_params, row_desc);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_import_geo_table(session, table_name, file_name, copy_params, row_desc);
	  }
	};

	MapDClient.prototype.send_import_geo_table = function (session, table_name, file_name, copy_params, row_desc) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('import_geo_table', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_import_geo_table_args();
	  args.session = session;
	  args.table_name = table_name;
	  args.file_name = file_name;
	  args.copy_params = copy_params;
	  args.row_desc = row_desc;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_import_geo_table = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_import_geo_table_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.import_table_status = function (session, import_id, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_import_table_status(session, import_id);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_import_table_status(session, import_id);
	  }
	};

	MapDClient.prototype.send_import_table_status = function (session, import_id) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('import_table_status', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_import_table_status_args();
	  args.session = session;
	  args.import_id = import_id;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_import_table_status = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_import_table_status_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('import_table_status failed: unknown result');
	};
	MapDClient.prototype.start_query = function (session, query_ra, just_explain, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_start_query(session, query_ra, just_explain);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_start_query(session, query_ra, just_explain);
	  }
	};

	MapDClient.prototype.send_start_query = function (session, query_ra, just_explain) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('start_query', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_start_query_args();
	  args.session = session;
	  args.query_ra = query_ra;
	  args.just_explain = just_explain;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_start_query = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_start_query_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('start_query failed: unknown result');
	};
	MapDClient.prototype.execute_first_step = function (pending_query, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_execute_first_step(pending_query);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_execute_first_step(pending_query);
	  }
	};

	MapDClient.prototype.send_execute_first_step = function (pending_query) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('execute_first_step', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_execute_first_step_args();
	  args.pending_query = pending_query;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_execute_first_step = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_execute_first_step_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('execute_first_step failed: unknown result');
	};
	MapDClient.prototype.broadcast_serialized_rows = function (serialized_rows, row_desc, query_id, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_broadcast_serialized_rows(serialized_rows, row_desc, query_id);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_broadcast_serialized_rows(serialized_rows, row_desc, query_id);
	  }
	};

	MapDClient.prototype.send_broadcast_serialized_rows = function (serialized_rows, row_desc, query_id) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('broadcast_serialized_rows', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_broadcast_serialized_rows_args();
	  args.serialized_rows = serialized_rows;
	  args.row_desc = row_desc;
	  args.query_id = query_id;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_broadcast_serialized_rows = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_broadcast_serialized_rows_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.render_vega_raw_pixels = function (session, widget_id, vega_json, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_render_vega_raw_pixels(session, widget_id, vega_json);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_render_vega_raw_pixels(session, widget_id, vega_json);
	  }
	};

	MapDClient.prototype.send_render_vega_raw_pixels = function (session, widget_id, vega_json) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('render_vega_raw_pixels', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_render_vega_raw_pixels_args();
	  args.session = session;
	  args.widget_id = widget_id;
	  args.vega_json = vega_json;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_render_vega_raw_pixels = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_render_vega_raw_pixels_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('render_vega_raw_pixels failed: unknown result');
	};
	MapDClient.prototype.insert_data = function (session, insert_data, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_insert_data(session, insert_data);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_insert_data(session, insert_data);
	  }
	};

	MapDClient.prototype.send_insert_data = function (session, insert_data) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('insert_data', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_insert_data_args();
	  args.session = session;
	  args.insert_data = insert_data;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_insert_data = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_insert_data_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  callback(null);
	};
	MapDClient.prototype.get_table_descriptor = function (session, table_name, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_table_descriptor(session, table_name);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_table_descriptor(session, table_name);
	  }
	};

	MapDClient.prototype.send_get_table_descriptor = function (session, table_name) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_table_descriptor', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_table_descriptor_args();
	  args.session = session;
	  args.table_name = table_name;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_table_descriptor = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_table_descriptor_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_table_descriptor failed: unknown result');
	};
	MapDClient.prototype.get_row_descriptor = function (session, table_name, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_row_descriptor(session, table_name);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_row_descriptor(session, table_name);
	  }
	};

	MapDClient.prototype.send_get_row_descriptor = function (session, table_name) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_row_descriptor', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_row_descriptor_args();
	  args.session = session;
	  args.table_name = table_name;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_row_descriptor = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_row_descriptor_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_row_descriptor failed: unknown result');
	};
	MapDClient.prototype.render = function (session, query, render_type, nonce, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_render(session, query, render_type, nonce);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_render(session, query, render_type, nonce);
	  }
	};

	MapDClient.prototype.send_render = function (session, query, render_type, nonce) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('render', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_render_args();
	  args.session = session;
	  args.query = query;
	  args.render_type = render_type;
	  args.nonce = nonce;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_render = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_render_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('render failed: unknown result');
	};
	MapDClient.prototype.get_rows_for_pixels = function (session, widget_id, pixels, table_name, col_names, column_format, nonce, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_rows_for_pixels(session, widget_id, pixels, table_name, col_names, column_format, nonce);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_rows_for_pixels(session, widget_id, pixels, table_name, col_names, column_format, nonce);
	  }
	};

	MapDClient.prototype.send_get_rows_for_pixels = function (session, widget_id, pixels, table_name, col_names, column_format, nonce) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_rows_for_pixels', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_rows_for_pixels_args();
	  args.session = session;
	  args.widget_id = widget_id;
	  args.pixels = pixels;
	  args.table_name = table_name;
	  args.col_names = col_names;
	  args.column_format = column_format;
	  args.nonce = nonce;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_rows_for_pixels = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_rows_for_pixels_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_rows_for_pixels failed: unknown result');
	};
	MapDClient.prototype.get_row_for_pixel = function (session, widget_id, pixel, table_name, col_names, column_format, pixelRadius, nonce, callback) {
	  this._seqid = this.new_seqid();
	  if (callback === undefined) {
	    var _defer = Q.defer();
	    this._reqs[this.seqid()] = function (error, result) {
	      if (error) {
	        _defer.reject(error);
	      } else {
	        _defer.resolve(result);
	      }
	    };
	    this.send_get_row_for_pixel(session, widget_id, pixel, table_name, col_names, column_format, pixelRadius, nonce);
	    return _defer.promise;
	  } else {
	    this._reqs[this.seqid()] = callback;
	    this.send_get_row_for_pixel(session, widget_id, pixel, table_name, col_names, column_format, pixelRadius, nonce);
	  }
	};

	MapDClient.prototype.send_get_row_for_pixel = function (session, widget_id, pixel, table_name, col_names, column_format, pixelRadius, nonce) {
	  var output = new this.pClass(this.output);
	  output.writeMessageBegin('get_row_for_pixel', Thrift.MessageType.CALL, this.seqid());
	  var args = new MapD_get_row_for_pixel_args();
	  args.session = session;
	  args.widget_id = widget_id;
	  args.pixel = pixel;
	  args.table_name = table_name;
	  args.col_names = col_names;
	  args.column_format = column_format;
	  args.pixelRadius = pixelRadius;
	  args.nonce = nonce;
	  args.write(output);
	  output.writeMessageEnd();
	  return this.output.flush();
	};

	MapDClient.prototype.recv_get_row_for_pixel = function (input, mtype, rseqid) {
	  var callback = this._reqs[rseqid] || function () {};
	  delete this._reqs[rseqid];
	  if (mtype == Thrift.MessageType.EXCEPTION) {
	    var x = new Thrift.TApplicationException();
	    x.read(input);
	    input.readMessageEnd();
	    return callback(x);
	  }
	  var result = new MapD_get_row_for_pixel_result();
	  result.read(input);
	  input.readMessageEnd();

	  if (null !== result.e) {
	    return callback(result.e);
	  }
	  if (null !== result.success) {
	    return callback(null, result.success);
	  }
	  return callback('get_row_for_pixel failed: unknown result');
	};
	var MapDProcessor = exports.Processor = function (handler) {
	  this._handler = handler;
	};
	MapDProcessor.prototype.process = function (input, output) {
	  var r = input.readMessageBegin();
	  if (this['process_' + r.fname]) {
	    return this['process_' + r.fname].call(this, r.rseqid, input, output);
	  } else {
	    input.skip(Thrift.Type.STRUCT);
	    input.readMessageEnd();
	    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
	    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
	    x.write(output);
	    output.writeMessageEnd();
	    output.flush();
	  }
	};

	MapDProcessor.prototype.process_connect = function (seqid, input, output) {
	  var args = new MapD_connect_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.connect.length === 3) {
	    Q.fcall(this._handler.connect, args.user, args.passwd, args.dbname).then(function (result) {
	      var result = new MapD_connect_result({ success: result });
	      output.writeMessageBegin("connect", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_connect_result(err);
	        output.writeMessageBegin("connect", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("connect", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.connect(args.user, args.passwd, args.dbname, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_connect_result(err != null ? err : { success: result });
	        output.writeMessageBegin("connect", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("connect", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_disconnect = function (seqid, input, output) {
	  var args = new MapD_disconnect_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.disconnect.length === 1) {
	    Q.fcall(this._handler.disconnect, args.session).then(function (result) {
	      var result = new MapD_disconnect_result({ success: result });
	      output.writeMessageBegin("disconnect", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_disconnect_result(err);
	        output.writeMessageBegin("disconnect", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("disconnect", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.disconnect(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_disconnect_result(err != null ? err : { success: result });
	        output.writeMessageBegin("disconnect", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("disconnect", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_server_status = function (seqid, input, output) {
	  var args = new MapD_get_server_status_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_server_status.length === 1) {
	    Q.fcall(this._handler.get_server_status, args.session).then(function (result) {
	      var result = new MapD_get_server_status_result({ success: result });
	      output.writeMessageBegin("get_server_status", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_server_status_result(err);
	        output.writeMessageBegin("get_server_status", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_server_status", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_server_status(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_server_status_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_server_status", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_server_status", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_tables = function (seqid, input, output) {
	  var args = new MapD_get_tables_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_tables.length === 1) {
	    Q.fcall(this._handler.get_tables, args.session).then(function (result) {
	      var result = new MapD_get_tables_result({ success: result });
	      output.writeMessageBegin("get_tables", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_tables_result(err);
	        output.writeMessageBegin("get_tables", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_tables", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_tables(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_tables_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_tables", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_tables", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_table_details = function (seqid, input, output) {
	  var args = new MapD_get_table_details_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_table_details.length === 2) {
	    Q.fcall(this._handler.get_table_details, args.session, args.table_name).then(function (result) {
	      var result = new MapD_get_table_details_result({ success: result });
	      output.writeMessageBegin("get_table_details", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_table_details_result(err);
	        output.writeMessageBegin("get_table_details", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_table_details", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_table_details(args.session, args.table_name, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_table_details_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_table_details", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_table_details", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_users = function (seqid, input, output) {
	  var args = new MapD_get_users_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_users.length === 1) {
	    Q.fcall(this._handler.get_users, args.session).then(function (result) {
	      var result = new MapD_get_users_result({ success: result });
	      output.writeMessageBegin("get_users", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_users_result(err);
	        output.writeMessageBegin("get_users", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_users", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_users(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_users_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_users", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_users", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_databases = function (seqid, input, output) {
	  var args = new MapD_get_databases_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_databases.length === 1) {
	    Q.fcall(this._handler.get_databases, args.session).then(function (result) {
	      var result = new MapD_get_databases_result({ success: result });
	      output.writeMessageBegin("get_databases", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_databases_result(err);
	        output.writeMessageBegin("get_databases", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_databases", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_databases(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_databases_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_databases", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_databases", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_version = function (seqid, input, output) {
	  var args = new MapD_get_version_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_version.length === 0) {
	    Q.fcall(this._handler.get_version).then(function (result) {
	      var result = new MapD_get_version_result({ success: result });
	      output.writeMessageBegin("get_version", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_version_result(err);
	        output.writeMessageBegin("get_version", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_version", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_version(function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_version_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_version", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_version", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_start_heap_profile = function (seqid, input, output) {
	  var args = new MapD_start_heap_profile_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.start_heap_profile.length === 1) {
	    Q.fcall(this._handler.start_heap_profile, args.session).then(function (result) {
	      var result = new MapD_start_heap_profile_result({ success: result });
	      output.writeMessageBegin("start_heap_profile", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_start_heap_profile_result(err);
	        output.writeMessageBegin("start_heap_profile", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("start_heap_profile", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.start_heap_profile(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_start_heap_profile_result(err != null ? err : { success: result });
	        output.writeMessageBegin("start_heap_profile", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("start_heap_profile", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_stop_heap_profile = function (seqid, input, output) {
	  var args = new MapD_stop_heap_profile_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.stop_heap_profile.length === 1) {
	    Q.fcall(this._handler.stop_heap_profile, args.session).then(function (result) {
	      var result = new MapD_stop_heap_profile_result({ success: result });
	      output.writeMessageBegin("stop_heap_profile", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_stop_heap_profile_result(err);
	        output.writeMessageBegin("stop_heap_profile", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("stop_heap_profile", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.stop_heap_profile(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_stop_heap_profile_result(err != null ? err : { success: result });
	        output.writeMessageBegin("stop_heap_profile", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("stop_heap_profile", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_heap_profile = function (seqid, input, output) {
	  var args = new MapD_get_heap_profile_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_heap_profile.length === 1) {
	    Q.fcall(this._handler.get_heap_profile, args.session).then(function (result) {
	      var result = new MapD_get_heap_profile_result({ success: result });
	      output.writeMessageBegin("get_heap_profile", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_heap_profile_result(err);
	        output.writeMessageBegin("get_heap_profile", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_heap_profile", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_heap_profile(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_heap_profile_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_heap_profile", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_heap_profile", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_memory_gpu = function (seqid, input, output) {
	  var args = new MapD_get_memory_gpu_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_memory_gpu.length === 1) {
	    Q.fcall(this._handler.get_memory_gpu, args.session).then(function (result) {
	      var result = new MapD_get_memory_gpu_result({ success: result });
	      output.writeMessageBegin("get_memory_gpu", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_memory_gpu_result(err);
	        output.writeMessageBegin("get_memory_gpu", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_memory_gpu", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_memory_gpu(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_memory_gpu_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_memory_gpu", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_memory_gpu", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_memory_summary = function (seqid, input, output) {
	  var args = new MapD_get_memory_summary_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_memory_summary.length === 1) {
	    Q.fcall(this._handler.get_memory_summary, args.session).then(function (result) {
	      var result = new MapD_get_memory_summary_result({ success: result });
	      output.writeMessageBegin("get_memory_summary", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_memory_summary_result(err);
	        output.writeMessageBegin("get_memory_summary", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_memory_summary", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_memory_summary(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_memory_summary_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_memory_summary", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_memory_summary", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_clear_cpu_memory = function (seqid, input, output) {
	  var args = new MapD_clear_cpu_memory_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.clear_cpu_memory.length === 1) {
	    Q.fcall(this._handler.clear_cpu_memory, args.session).then(function (result) {
	      var result = new MapD_clear_cpu_memory_result({ success: result });
	      output.writeMessageBegin("clear_cpu_memory", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_clear_cpu_memory_result(err);
	        output.writeMessageBegin("clear_cpu_memory", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("clear_cpu_memory", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.clear_cpu_memory(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_clear_cpu_memory_result(err != null ? err : { success: result });
	        output.writeMessageBegin("clear_cpu_memory", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("clear_cpu_memory", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_clear_gpu_memory = function (seqid, input, output) {
	  var args = new MapD_clear_gpu_memory_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.clear_gpu_memory.length === 1) {
	    Q.fcall(this._handler.clear_gpu_memory, args.session).then(function (result) {
	      var result = new MapD_clear_gpu_memory_result({ success: result });
	      output.writeMessageBegin("clear_gpu_memory", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_clear_gpu_memory_result(err);
	        output.writeMessageBegin("clear_gpu_memory", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("clear_gpu_memory", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.clear_gpu_memory(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_clear_gpu_memory_result(err != null ? err : { success: result });
	        output.writeMessageBegin("clear_gpu_memory", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("clear_gpu_memory", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_sql_execute = function (seqid, input, output) {
	  var args = new MapD_sql_execute_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.sql_execute.length === 5) {
	    Q.fcall(this._handler.sql_execute, args.session, args.query, args.column_format, args.nonce, args.first_n).then(function (result) {
	      var result = new MapD_sql_execute_result({ success: result });
	      output.writeMessageBegin("sql_execute", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_sql_execute_result(err);
	        output.writeMessageBegin("sql_execute", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("sql_execute", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.sql_execute(args.session, args.query, args.column_format, args.nonce, args.first_n, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_sql_execute_result(err != null ? err : { success: result });
	        output.writeMessageBegin("sql_execute", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("sql_execute", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_interrupt = function (seqid, input, output) {
	  var args = new MapD_interrupt_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.interrupt.length === 1) {
	    Q.fcall(this._handler.interrupt, args.session).then(function (result) {
	      var result = new MapD_interrupt_result({ success: result });
	      output.writeMessageBegin("interrupt", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_interrupt_result(err);
	        output.writeMessageBegin("interrupt", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("interrupt", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.interrupt(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_interrupt_result(err != null ? err : { success: result });
	        output.writeMessageBegin("interrupt", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("interrupt", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_sql_validate = function (seqid, input, output) {
	  var args = new MapD_sql_validate_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.sql_validate.length === 2) {
	    Q.fcall(this._handler.sql_validate, args.session, args.query).then(function (result) {
	      var result = new MapD_sql_validate_result({ success: result });
	      output.writeMessageBegin("sql_validate", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_sql_validate_result(err);
	        output.writeMessageBegin("sql_validate", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("sql_validate", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.sql_validate(args.session, args.query, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_sql_validate_result(err != null ? err : { success: result });
	        output.writeMessageBegin("sql_validate", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("sql_validate", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_set_execution_mode = function (seqid, input, output) {
	  var args = new MapD_set_execution_mode_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.set_execution_mode.length === 2) {
	    Q.fcall(this._handler.set_execution_mode, args.session, args.mode).then(function (result) {
	      var result = new MapD_set_execution_mode_result({ success: result });
	      output.writeMessageBegin("set_execution_mode", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_set_execution_mode_result(err);
	        output.writeMessageBegin("set_execution_mode", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("set_execution_mode", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.set_execution_mode(args.session, args.mode, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_set_execution_mode_result(err != null ? err : { success: result });
	        output.writeMessageBegin("set_execution_mode", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("set_execution_mode", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_render_vega = function (seqid, input, output) {
	  var args = new MapD_render_vega_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.render_vega.length === 5) {
	    Q.fcall(this._handler.render_vega, args.session, args.widget_id, args.vega_json, args.compression_level, args.nonce).then(function (result) {
	      var result = new MapD_render_vega_result({ success: result });
	      output.writeMessageBegin("render_vega", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_render_vega_result(err);
	        output.writeMessageBegin("render_vega", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("render_vega", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.render_vega(args.session, args.widget_id, args.vega_json, args.compression_level, args.nonce, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_render_vega_result(err != null ? err : { success: result });
	        output.writeMessageBegin("render_vega", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("render_vega", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_result_row_for_pixel = function (seqid, input, output) {
	  var args = new MapD_get_result_row_for_pixel_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_result_row_for_pixel.length === 7) {
	    Q.fcall(this._handler.get_result_row_for_pixel, args.session, args.widget_id, args.pixel, args.table_col_names, args.column_format, args.pixelRadius, args.nonce).then(function (result) {
	      var result = new MapD_get_result_row_for_pixel_result({ success: result });
	      output.writeMessageBegin("get_result_row_for_pixel", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_result_row_for_pixel_result(err);
	        output.writeMessageBegin("get_result_row_for_pixel", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_result_row_for_pixel", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_result_row_for_pixel(args.session, args.widget_id, args.pixel, args.table_col_names, args.column_format, args.pixelRadius, args.nonce, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_result_row_for_pixel_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_result_row_for_pixel", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_result_row_for_pixel", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_frontend_view = function (seqid, input, output) {
	  var args = new MapD_get_frontend_view_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_frontend_view.length === 2) {
	    Q.fcall(this._handler.get_frontend_view, args.session, args.view_name).then(function (result) {
	      var result = new MapD_get_frontend_view_result({ success: result });
	      output.writeMessageBegin("get_frontend_view", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_frontend_view_result(err);
	        output.writeMessageBegin("get_frontend_view", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_frontend_view", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_frontend_view(args.session, args.view_name, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_frontend_view_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_frontend_view", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_frontend_view", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_frontend_views = function (seqid, input, output) {
	  var args = new MapD_get_frontend_views_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_frontend_views.length === 1) {
	    Q.fcall(this._handler.get_frontend_views, args.session).then(function (result) {
	      var result = new MapD_get_frontend_views_result({ success: result });
	      output.writeMessageBegin("get_frontend_views", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_frontend_views_result(err);
	        output.writeMessageBegin("get_frontend_views", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_frontend_views", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_frontend_views(args.session, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_frontend_views_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_frontend_views", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_frontend_views", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_create_frontend_view = function (seqid, input, output) {
	  var args = new MapD_create_frontend_view_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.create_frontend_view.length === 5) {
	    Q.fcall(this._handler.create_frontend_view, args.session, args.view_name, args.view_state, args.image_hash, args.view_metadata).then(function (result) {
	      var result = new MapD_create_frontend_view_result({ success: result });
	      output.writeMessageBegin("create_frontend_view", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_create_frontend_view_result(err);
	        output.writeMessageBegin("create_frontend_view", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("create_frontend_view", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.create_frontend_view(args.session, args.view_name, args.view_state, args.image_hash, args.view_metadata, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_create_frontend_view_result(err != null ? err : { success: result });
	        output.writeMessageBegin("create_frontend_view", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("create_frontend_view", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_delete_frontend_view = function (seqid, input, output) {
	  var args = new MapD_delete_frontend_view_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.delete_frontend_view.length === 2) {
	    Q.fcall(this._handler.delete_frontend_view, args.session, args.view_name).then(function (result) {
	      var result = new MapD_delete_frontend_view_result({ success: result });
	      output.writeMessageBegin("delete_frontend_view", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_delete_frontend_view_result(err);
	        output.writeMessageBegin("delete_frontend_view", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("delete_frontend_view", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.delete_frontend_view(args.session, args.view_name, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_delete_frontend_view_result(err != null ? err : { success: result });
	        output.writeMessageBegin("delete_frontend_view", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("delete_frontend_view", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_link_view = function (seqid, input, output) {
	  var args = new MapD_get_link_view_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_link_view.length === 2) {
	    Q.fcall(this._handler.get_link_view, args.session, args.link).then(function (result) {
	      var result = new MapD_get_link_view_result({ success: result });
	      output.writeMessageBegin("get_link_view", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_link_view_result(err);
	        output.writeMessageBegin("get_link_view", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_link_view", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_link_view(args.session, args.link, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_link_view_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_link_view", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_link_view", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_create_link = function (seqid, input, output) {
	  var args = new MapD_create_link_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.create_link.length === 3) {
	    Q.fcall(this._handler.create_link, args.session, args.view_state, args.view_metadata).then(function (result) {
	      var result = new MapD_create_link_result({ success: result });
	      output.writeMessageBegin("create_link", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_create_link_result(err);
	        output.writeMessageBegin("create_link", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("create_link", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.create_link(args.session, args.view_state, args.view_metadata, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_create_link_result(err != null ? err : { success: result });
	        output.writeMessageBegin("create_link", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("create_link", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_load_table_binary = function (seqid, input, output) {
	  var args = new MapD_load_table_binary_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.load_table_binary.length === 3) {
	    Q.fcall(this._handler.load_table_binary, args.session, args.table_name, args.rows).then(function (result) {
	      var result = new MapD_load_table_binary_result({ success: result });
	      output.writeMessageBegin("load_table_binary", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_load_table_binary_result(err);
	        output.writeMessageBegin("load_table_binary", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("load_table_binary", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.load_table_binary(args.session, args.table_name, args.rows, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_load_table_binary_result(err != null ? err : { success: result });
	        output.writeMessageBegin("load_table_binary", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("load_table_binary", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_load_table = function (seqid, input, output) {
	  var args = new MapD_load_table_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.load_table.length === 3) {
	    Q.fcall(this._handler.load_table, args.session, args.table_name, args.rows).then(function (result) {
	      var result = new MapD_load_table_result({ success: result });
	      output.writeMessageBegin("load_table", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_load_table_result(err);
	        output.writeMessageBegin("load_table", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("load_table", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.load_table(args.session, args.table_name, args.rows, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_load_table_result(err != null ? err : { success: result });
	        output.writeMessageBegin("load_table", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("load_table", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_detect_column_types = function (seqid, input, output) {
	  var args = new MapD_detect_column_types_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.detect_column_types.length === 3) {
	    Q.fcall(this._handler.detect_column_types, args.session, args.file_name, args.copy_params).then(function (result) {
	      var result = new MapD_detect_column_types_result({ success: result });
	      output.writeMessageBegin("detect_column_types", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_detect_column_types_result(err);
	        output.writeMessageBegin("detect_column_types", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("detect_column_types", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.detect_column_types(args.session, args.file_name, args.copy_params, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_detect_column_types_result(err != null ? err : { success: result });
	        output.writeMessageBegin("detect_column_types", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("detect_column_types", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_create_table = function (seqid, input, output) {
	  var args = new MapD_create_table_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.create_table.length === 4) {
	    Q.fcall(this._handler.create_table, args.session, args.table_name, args.row_desc, args.table_type).then(function (result) {
	      var result = new MapD_create_table_result({ success: result });
	      output.writeMessageBegin("create_table", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_create_table_result(err);
	        output.writeMessageBegin("create_table", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("create_table", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.create_table(args.session, args.table_name, args.row_desc, args.table_type, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_create_table_result(err != null ? err : { success: result });
	        output.writeMessageBegin("create_table", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("create_table", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_import_table = function (seqid, input, output) {
	  var args = new MapD_import_table_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.import_table.length === 4) {
	    Q.fcall(this._handler.import_table, args.session, args.table_name, args.file_name, args.copy_params).then(function (result) {
	      var result = new MapD_import_table_result({ success: result });
	      output.writeMessageBegin("import_table", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_import_table_result(err);
	        output.writeMessageBegin("import_table", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("import_table", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.import_table(args.session, args.table_name, args.file_name, args.copy_params, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_import_table_result(err != null ? err : { success: result });
	        output.writeMessageBegin("import_table", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("import_table", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_import_geo_table = function (seqid, input, output) {
	  var args = new MapD_import_geo_table_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.import_geo_table.length === 5) {
	    Q.fcall(this._handler.import_geo_table, args.session, args.table_name, args.file_name, args.copy_params, args.row_desc).then(function (result) {
	      var result = new MapD_import_geo_table_result({ success: result });
	      output.writeMessageBegin("import_geo_table", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_import_geo_table_result(err);
	        output.writeMessageBegin("import_geo_table", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("import_geo_table", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.import_geo_table(args.session, args.table_name, args.file_name, args.copy_params, args.row_desc, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_import_geo_table_result(err != null ? err : { success: result });
	        output.writeMessageBegin("import_geo_table", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("import_geo_table", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_import_table_status = function (seqid, input, output) {
	  var args = new MapD_import_table_status_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.import_table_status.length === 2) {
	    Q.fcall(this._handler.import_table_status, args.session, args.import_id).then(function (result) {
	      var result = new MapD_import_table_status_result({ success: result });
	      output.writeMessageBegin("import_table_status", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_import_table_status_result(err);
	        output.writeMessageBegin("import_table_status", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("import_table_status", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.import_table_status(args.session, args.import_id, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_import_table_status_result(err != null ? err : { success: result });
	        output.writeMessageBegin("import_table_status", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("import_table_status", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_start_query = function (seqid, input, output) {
	  var args = new MapD_start_query_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.start_query.length === 3) {
	    Q.fcall(this._handler.start_query, args.session, args.query_ra, args.just_explain).then(function (result) {
	      var result = new MapD_start_query_result({ success: result });
	      output.writeMessageBegin("start_query", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_start_query_result(err);
	        output.writeMessageBegin("start_query", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("start_query", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.start_query(args.session, args.query_ra, args.just_explain, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_start_query_result(err != null ? err : { success: result });
	        output.writeMessageBegin("start_query", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("start_query", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_execute_first_step = function (seqid, input, output) {
	  var args = new MapD_execute_first_step_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.execute_first_step.length === 1) {
	    Q.fcall(this._handler.execute_first_step, args.pending_query).then(function (result) {
	      var result = new MapD_execute_first_step_result({ success: result });
	      output.writeMessageBegin("execute_first_step", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_execute_first_step_result(err);
	        output.writeMessageBegin("execute_first_step", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("execute_first_step", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.execute_first_step(args.pending_query, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_execute_first_step_result(err != null ? err : { success: result });
	        output.writeMessageBegin("execute_first_step", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("execute_first_step", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_broadcast_serialized_rows = function (seqid, input, output) {
	  var args = new MapD_broadcast_serialized_rows_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.broadcast_serialized_rows.length === 3) {
	    Q.fcall(this._handler.broadcast_serialized_rows, args.serialized_rows, args.row_desc, args.query_id).then(function (result) {
	      var result = new MapD_broadcast_serialized_rows_result({ success: result });
	      output.writeMessageBegin("broadcast_serialized_rows", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_broadcast_serialized_rows_result(err);
	        output.writeMessageBegin("broadcast_serialized_rows", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("broadcast_serialized_rows", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.broadcast_serialized_rows(args.serialized_rows, args.row_desc, args.query_id, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_broadcast_serialized_rows_result(err != null ? err : { success: result });
	        output.writeMessageBegin("broadcast_serialized_rows", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("broadcast_serialized_rows", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_render_vega_raw_pixels = function (seqid, input, output) {
	  var args = new MapD_render_vega_raw_pixels_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.render_vega_raw_pixels.length === 3) {
	    Q.fcall(this._handler.render_vega_raw_pixels, args.session, args.widget_id, args.vega_json).then(function (result) {
	      var result = new MapD_render_vega_raw_pixels_result({ success: result });
	      output.writeMessageBegin("render_vega_raw_pixels", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_render_vega_raw_pixels_result(err);
	        output.writeMessageBegin("render_vega_raw_pixels", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("render_vega_raw_pixels", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.render_vega_raw_pixels(args.session, args.widget_id, args.vega_json, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_render_vega_raw_pixels_result(err != null ? err : { success: result });
	        output.writeMessageBegin("render_vega_raw_pixels", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("render_vega_raw_pixels", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_insert_data = function (seqid, input, output) {
	  var args = new MapD_insert_data_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.insert_data.length === 2) {
	    Q.fcall(this._handler.insert_data, args.session, args.insert_data).then(function (result) {
	      var result = new MapD_insert_data_result({ success: result });
	      output.writeMessageBegin("insert_data", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_insert_data_result(err);
	        output.writeMessageBegin("insert_data", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("insert_data", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.insert_data(args.session, args.insert_data, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_insert_data_result(err != null ? err : { success: result });
	        output.writeMessageBegin("insert_data", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("insert_data", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_table_descriptor = function (seqid, input, output) {
	  var args = new MapD_get_table_descriptor_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_table_descriptor.length === 2) {
	    Q.fcall(this._handler.get_table_descriptor, args.session, args.table_name).then(function (result) {
	      var result = new MapD_get_table_descriptor_result({ success: result });
	      output.writeMessageBegin("get_table_descriptor", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_table_descriptor_result(err);
	        output.writeMessageBegin("get_table_descriptor", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_table_descriptor", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_table_descriptor(args.session, args.table_name, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_table_descriptor_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_table_descriptor", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_table_descriptor", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_row_descriptor = function (seqid, input, output) {
	  var args = new MapD_get_row_descriptor_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_row_descriptor.length === 2) {
	    Q.fcall(this._handler.get_row_descriptor, args.session, args.table_name).then(function (result) {
	      var result = new MapD_get_row_descriptor_result({ success: result });
	      output.writeMessageBegin("get_row_descriptor", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_row_descriptor_result(err);
	        output.writeMessageBegin("get_row_descriptor", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_row_descriptor", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_row_descriptor(args.session, args.table_name, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_row_descriptor_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_row_descriptor", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_row_descriptor", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_render = function (seqid, input, output) {
	  var args = new MapD_render_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.render.length === 4) {
	    Q.fcall(this._handler.render, args.session, args.query, args.render_type, args.nonce).then(function (result) {
	      var result = new MapD_render_result({ success: result });
	      output.writeMessageBegin("render", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_render_result(err);
	        output.writeMessageBegin("render", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("render", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.render(args.session, args.query, args.render_type, args.nonce, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_render_result(err != null ? err : { success: result });
	        output.writeMessageBegin("render", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("render", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_rows_for_pixels = function (seqid, input, output) {
	  var args = new MapD_get_rows_for_pixels_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_rows_for_pixels.length === 7) {
	    Q.fcall(this._handler.get_rows_for_pixels, args.session, args.widget_id, args.pixels, args.table_name, args.col_names, args.column_format, args.nonce).then(function (result) {
	      var result = new MapD_get_rows_for_pixels_result({ success: result });
	      output.writeMessageBegin("get_rows_for_pixels", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_rows_for_pixels_result(err);
	        output.writeMessageBegin("get_rows_for_pixels", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_rows_for_pixels", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_rows_for_pixels(args.session, args.widget_id, args.pixels, args.table_name, args.col_names, args.column_format, args.nonce, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_rows_for_pixels_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_rows_for_pixels", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_rows_for_pixels", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

	MapDProcessor.prototype.process_get_row_for_pixel = function (seqid, input, output) {
	  var args = new MapD_get_row_for_pixel_args();
	  args.read(input);
	  input.readMessageEnd();
	  if (this._handler.get_row_for_pixel.length === 8) {
	    Q.fcall(this._handler.get_row_for_pixel, args.session, args.widget_id, args.pixel, args.table_name, args.col_names, args.column_format, args.pixelRadius, args.nonce).then(function (result) {
	      var result = new MapD_get_row_for_pixel_result({ success: result });
	      output.writeMessageBegin("get_row_for_pixel", Thrift.MessageType.REPLY, seqid);
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    }, function (err) {
	      if (err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_row_for_pixel_result(err);
	        output.writeMessageBegin("get_row_for_pixel", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_row_for_pixel", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  } else {
	    this._handler.get_row_for_pixel(args.session, args.widget_id, args.pixel, args.table_name, args.col_names, args.column_format, args.pixelRadius, args.nonce, function (err, result) {
	      if (err == null || err instanceof ttypes.TMapDException) {
	        var result = new MapD_get_row_for_pixel_result(err != null ? err : { success: result });
	        output.writeMessageBegin("get_row_for_pixel", Thrift.MessageType.REPLY, seqid);
	      } else {
	        var result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
	        output.writeMessageBegin("get_row_for_pixel", Thrift.MessageType.EXCEPTION, seqid);
	      }
	      result.write(output);
	      output.writeMessageEnd();
	      output.flush();
	    });
	  }
	};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _helpers = __webpack_require__(56);

	var helpers = _interopRequireWildcard(_helpers);

	var _mapdClientV = __webpack_require__(57);

	var _mapdClientV2 = _interopRequireDefault(_mapdClientV);

	var _processQueryResults = __webpack_require__(59);

	var _processQueryResults2 = _interopRequireDefault(_processQueryResults);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ref = isNodeRuntime() && __webpack_require__(52) || window,
	    TDatumType = _ref.TDatumType,
	    TEncodingType = _ref.TEncodingType; // eslint-disable-line global-require


	var MapDThrift = isNodeRuntime() && __webpack_require__(53); // eslint-disable-line global-require
	var Thrift = isNodeRuntime() && __webpack_require__(1) || window.Thrift; // eslint-disable-line global-require
	var thriftWrapper = Thrift;
	var parseUrl = isNodeRuntime() && __webpack_require__(23).parse; // eslint-disable-line global-require
	if (isNodeRuntime()) {
	  // Because browser Thrift and Node Thrift are exposed slightly differently.
	  Thrift = Thrift.Thrift;
	  Thrift.Transport = thriftWrapper.TBufferedTransport;
	  Thrift.Protocol = thriftWrapper.TJSONProtocol;
	}


	var COMPRESSION_LEVEL_DEFAULT = 3;

	function arrayify(maybeArray) {
	  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
	}

	function isNodeRuntime() {
	  return typeof window === "undefined";
	}

	var MapdCon = function () {
	  function MapdCon() {
	    var _this = this;

	    _classCallCheck(this, MapdCon);

	    this.updateQueryTimes = function (conId, queryId, estimatedQueryTime, execution_time_ms) {
	      _this.queryTimes[queryId] = execution_time_ms;
	    };

	    this.getFrontendViews = function (callback) {
	      if (_this._sessionId) {
	        _this._client[0].get_frontend_views(_this._sessionId[0], callback);
	      } else {
	        callback(new Error("No Session ID"));
	      }
	    };

	    this.getFrontendViewsAsync = function () {
	      return new Promise(function (resolve, reject) {
	        _this.getFrontendViews(function (error, views) {
	          if (error) {
	            reject(error);
	          } else {
	            resolve(views);
	          }
	        });
	      });
	    };

	    this.getFrontendView = function (viewName, callback) {
	      if (_this._sessionId && viewName) {
	        _this._client[0].get_frontend_view(_this._sessionId[0], viewName, callback);
	      } else {
	        callback(new Error("No Session ID"));
	      }
	    };

	    this.getFrontendViewAsync = function (viewName) {
	      return new Promise(function (resolve, reject) {
	        _this.getFrontendView(viewName, function (err, view) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(view);
	          }
	        });
	      });
	    };

	    this.getServerStatus = function (callback) {
	      _this._client[0].get_server_status(_this._sessionId[0], callback);
	    };

	    this.getServerStatusAsync = function () {
	      return new Promise(function (resolve, reject) {
	        _this.getServerStatus(function (err, result) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(result);
	          }
	        });
	      });
	    };

	    this.deleteFrontendViewAsync = function (viewName) {
	      return new Promise(function (resolve, reject) {
	        _this.deleteFrontendView(viewName, function (err) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(viewName);
	          }
	        });
	      });
	    };

	    this.getLinkView = function (link, callback) {
	      _this._client[0].get_link_view(_this._sessionId[0], link, callback);
	    };

	    this.getLinkViewAsync = function (link) {
	      return new Promise(function (resolve, reject) {
	        _this.getLinkView(link, function (err, theLink) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve(theLink);
	          }
	        });
	      });
	    };

	    this.queryAsync = this.query;

	    this.createTableAsync = function (tableName, rowDescObj, tableType) {
	      return new Promise(function (resolve, reject) {
	        _this.createTable(tableName, rowDescObj, tableType, function (err) {
	          if (err) {
	            reject(err);
	          } else {
	            resolve();
	          }
	        });
	      });
	    };

	    this.importTableAsync = this.importTableAsyncWrapper(false);
	    this.importTableGeoAsync = this.importTableAsyncWrapper(true);

	    this._host = null;
	    this._user = null;
	    this._password = null;
	    this._port = null;
	    this._dbName = null;
	    this._client = null;
	    this._sessionId = null;
	    this._protocol = null;
	    this._datumEnum = {};
	    this._logging = false;
	    this._platform = "mapd";
	    this._nonce = 0;
	    this._balanceStrategy = "adaptive";
	    this._numConnections = 0;
	    this._lastRenderCon = 0;
	    this.queryTimes = {};
	    this.serverQueueTimes = null;
	    this.serverPingTimes = null;
	    this.pingCount = null;
	    this.DEFAULT_QUERY_TIME = 50;
	    this.NUM_PINGS_PER_SERVER = 4;
	    this.importerRowDesc = null;

	    // invoke initialization methods
	    this.invertDatumTypes();

	    this.processResults = function () {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var result = arguments[1];
	      var callback = arguments[2];

	      var processor = (0, _processQueryResults2.default)(_this._logging, _this.updateQueryTimes);
	      var processResultsObject = processor(options, _this._datumEnum, result, callback);
	      return processResultsObject;
	    };

	    // return this to allow chaining off of instantiation
	    return this;
	  }

	  /**
	   * Create a connection to the server, generating a client and session id.
	   * @param {Function} callback A callback that takes `(err, success)` as its signature.  Returns con singleton on success.
	   * @return {MapdCon} Object
	   *
	   * @example <caption>Connect to a MapD server:</caption>
	   * var con = new MapdCon()
	   *   .host('localhost')
	   *   .port('8080')
	   *   .dbName('myDatabase')
	   *   .user('foo')
	   *   .password('bar')
	   *   .connect((err, con) => console.log(con.sessionId()));
	   *
	   *   // ["om9E9Ujgbhl6wIzWgLENncjWsaXRDYLy"]
	   */


	  _createClass(MapdCon, [{
	    key: "connect",
	    value: function connect(callback) {
	      var _this2 = this;

	      if (this._sessionId) {
	        this.disconnect();
	      }

	      // TODO: should be its own function
	      var allAreArrays = Array.isArray(this._host) && Array.isArray(this._port) && Array.isArray(this._user) && Array.isArray(this._password) && Array.isArray(this._dbName);
	      if (!allAreArrays) {
	        return callback("All connection parameters must be arrays.");
	      }

	      this._client = [];
	      this._sessionId = [];

	      if (!this._user[0]) {
	        return callback("Please enter a username.");
	      } else if (!this._password[0]) {
	        return callback("Please enter a password.");
	      } else if (!this._dbName[0]) {
	        return callback("Please enter a database.");
	      } else if (!this._host[0]) {
	        return callback("Please enter a host name.");
	      } else if (!this._port[0]) {
	        return callback("Please enter a port.");
	      }

	      // now check to see if length of all arrays are the same and > 0
	      var hostLength = this._host.length;
	      if (hostLength < 1) {
	        return callback("Must have at least one server to connect to.");
	      }
	      if (hostLength !== this._port.length || hostLength !== this._user.length || hostLength !== this._password.length || hostLength !== this._dbName.length) {
	        return callback("Array connection parameters must be of equal length.");
	      }

	      if (!this._protocol) {
	        this._protocol = this._host.map(function () {
	          return window.location.protocol.replace(":", "");
	        });
	      }

	      var transportUrls = this.getEndpoints();

	      var _loop = function _loop(h) {
	        var client = null;

	        if (isNodeRuntime()) {
	          var _parseUrl = parseUrl(transportUrls[h]),
	              protocol = _parseUrl.protocol,
	              hostname = _parseUrl.hostname,
	              port = _parseUrl.port;

	          var connection = thriftWrapper.createHttpConnection(hostname, port, {
	            transport: thriftWrapper.TBufferedTransport,
	            protocol: thriftWrapper.TJSONProtocol,
	            path: "/",
	            headers: { Connection: "close" },
	            https: protocol === "https:"
	          });
	          connection.on("error", console.error); // eslint-disable-line no-console
	          client = thriftWrapper.createClient(MapDThrift, connection);
	        } else {
	          var thriftTransport = new Thrift.Transport(transportUrls[h]);
	          var thriftProtocol = new Thrift.Protocol(thriftTransport);
	          client = new _mapdClientV2.default(thriftProtocol);
	        }

	        client.connect(_this2._user[h], _this2._password[h], _this2._dbName[h], function (error, sessionId) {
	          if (error) {
	            callback(error);
	            return;
	          }
	          _this2._client.push(client);
	          _this2._sessionId.push(sessionId);
	          _this2._numConnections = _this2._client.length;
	          callback(null, _this2);
	        });
	      };

	      for (var h = 0; h < hostLength; h++) {
	        _loop(h);
	      }

	      return this;
	    }
	  }, {
	    key: "convertFromThriftTypes",
	    value: function convertFromThriftTypes(fields) {
	      var fieldsArray = [];
	      // silly to change this from map to array
	      // - then later it turns back to map
	      for (var key in fields) {
	        if (fields.hasOwnProperty(key)) {
	          fieldsArray.push({
	            name: key,
	            type: this._datumEnum[fields[key].col_type.type],
	            is_array: fields[key].col_type.is_array,
	            is_dict: fields[key].col_type.encoding === TEncodingType.DICT // eslint-disable-line no-undef
	          });
	        }
	      }
	      return fieldsArray;
	    }

	    /**
	     * Disconnect from the server then clears the client and session values.
	     * @return {MapdCon} Object
	     * @param {Function} callback A callback that takes `(err, success)` as its signature.  Returns con singleton on success.
	     *
	     * @example <caption>Disconnect from the server:</caption>
	     *
	     * con.sessionId() // ["om9E9Ujgbhl6wIzWgLENncjWsaXRDYLy"]
	     * con.disconnect((err, con) => console.log(err, con))
	     * con.sessionId() === null;
	     */

	  }, {
	    key: "disconnect",
	    value: function disconnect(callback) {
	      var _this3 = this;

	      if (this._sessionId !== null) {
	        for (var c = 0; c < this._client.length; c++) {
	          this._client[c].disconnect(this._sessionId[c], function (error) {
	            // Success will return NULL

	            if (error) {
	              return callback(error, _this3);
	            }
	            _this3._sessionId = null;
	            _this3._client = null;
	            _this3._numConnections = 0;
	            _this3.serverPingTimes = null;
	            return callback(null, _this3);
	          });
	        }
	      }
	      return this;
	    }

	    /**
	     * Get the recent dashboards as a list of <code>TFrontendView</code> objects.
	     * These objects contain a value for the <code>view_name</code> property,
	     * but not for the <code>view_state</code> property.
	     * @return {Promise<TFrontendView[]>} An array which has all saved dashboards.
	     *
	     * @example <caption>Get the list of dashboards from the server:</caption>
	     *
	     * con.getFrontendViewsAsync().then((results) => console.log(results))
	     * // [TFrontendView, TFrontendView]
	     */


	    /**
	     * Get a dashboard object containing a value for the <code>view_state</code> property.
	     * This object contains a value for the <code>view_state</code> property,
	     * but not for the <code>view_name</code> property.
	     * @param {String} viewName the name of the dashboard
	     * @return {Promise.<Object>} An object that contains all data and metadata related to the dashboard
	     *
	     * @example <caption>Get a specific dashboard from the server:</caption>
	     *
	     * con.getFrontendViewAsync('dashboard_name').then((result) => console.log(result))
	     * // {TFrontendView}
	     */


	    /**
	     * Get the status of the server as a <code>TServerStatus</code> object.
	     * This includes whether the server is read-only,
	     * has backend rendering enabled, and the version number.
	     * @return {Promise.<Object>}
	     *
	     * @example <caption>Get the server status:</caption>
	     *
	     * con.getServerStatusAsync().then((result) => console.log(result))
	     * // {
	     * //   "read_only": false,
	     * //   "version": "3.0.0dev-20170503-40e2de3",
	     * //   "rendering_enabled": true,
	     * //   "start_time": 1493840131
	     * // }
	     */

	  }, {
	    key: "createFrontendViewAsync",


	    /**
	     * Add a new dashboard to the server.
	     * @param {String} viewName - the name of the new dashboard
	     * @param {String} viewState - the base64-encoded state string of the new dashboard
	     * @param {String} imageHash - the numeric hash of the dashboard thumbnail
	     * @param {String} metaData - Stringified metaData related to the view
	     * @return {Promise} Returns empty if success
	     *
	     * @example <caption>Add a new dashboard to the server:</caption>
	     *
	     * con.createFrontendViewAsync('newSave', 'viewstateBase64', null, 'metaData').then(res => console.log(res))
	     */
	    value: function createFrontendViewAsync(viewName, viewState, imageHash, metaData) {
	      var _this4 = this;

	      if (!this._sessionId) {
	        return new Promise(function (resolve, reject) {
	          reject(new Error("You are not connected to a server. Try running the connect method first."));
	        });
	      }

	      return Promise.all(this._client.map(function (client, i) {
	        return new Promise(function (resolve, reject) {
	          client.create_frontend_view(_this4._sessionId[i], viewName, viewState, imageHash, metaData, function (error, data) {
	            if (error) {
	              reject(error);
	            } else {
	              resolve(data);
	            }
	          });
	        });
	      }));
	    }
	  }, {
	    key: "deleteFrontendView",
	    value: function deleteFrontendView(viewName, callback) {
	      var _this5 = this;

	      if (!this._sessionId) {
	        throw new Error("You are not connected to a server. Try running the connect method first.");
	      }
	      try {
	        this._client.forEach(function (client, i) {
	          // do we want to try each one individually so if we fail we keep going?
	          client.delete_frontend_view(_this5._sessionId[i], viewName, callback);
	        });
	      } catch (err) {
	        console.log("ERROR: Could not delete the frontend view. Check your session id.", err);
	      }
	    }

	    /**
	     * Delete a dashboard object containing a value for the <code>view_state</code> property.
	     * @param {String} viewName - the name of the dashboard
	     * @return {Promise.<String>} Name of dashboard successfully deleted
	     *
	     * @example <caption>Delete a specific dashboard from the server:</caption>
	     *
	     * con.deleteFrontendViewAsync('dashboard_name').then(res => console.log(res))
	     */

	  }, {
	    key: "createLinkAsync",


	    /**
	     * Create a short hash to make it easy to share a link to a specific dashboard.
	     * @param {String} viewState - the base64-encoded state string of the new dashboard
	     * @param {String} metaData - Stringified metaData related to the link
	     * @return {Promise.<String[]>} link - A short hash of the dashboard used for URLs
	     *
	     * @example <caption>Create a link to the current state of a dashboard:</caption>
	     *
	     * con.createLinkAsync("eyJuYW1lIjoibXlkYXNoYm9hcmQifQ==", 'metaData').then(res => console.log(res));
	     * // ["28127951"]
	     */
	    value: function createLinkAsync(viewState, metaData) {
	      var _this6 = this;

	      return Promise.all(this._client.map(function (client, i) {
	        return new Promise(function (resolve, reject) {
	          client.create_link(_this6._sessionId[i], viewState, metaData, function (error, data) {
	            if (error) {
	              reject(error);
	            } else {
	              var result = data.split(",").reduce(function (links, link) {
	                if (links.indexOf(link) === -1) {
	                  links.push(link);
	                }
	                return links;
	              }, []);
	              if (!result || result.length !== 1) {
	                reject(new Error("Different links were created on connection"));
	              } else {
	                resolve(result.join());
	              }
	            }
	          });
	        });
	      }));
	    }

	    /**
	     * Get a fully-formed dashboard object from a generated share link.
	     * This object contains the given link for the <code>view_name</code> property,
	     * @param {String} link - the short hash of the dashboard, see {@link createLink}
	     * @return {Promise.<Object>} Object of the dashboard and metadata
	     *
	     * @example <caption>Get a dashboard from a link:</caption>
	     *
	     * con.getLinkViewAsync('28127951').then(res => console.log(res))
	     * //  {
	     * //    "view_name": "28127951",
	     * //    "view_state": "eyJuYW1lIjoibXlkYXNoYm9hcmQifQ==",
	     * //    "image_hash": "",
	     * //    "update_time": "2017-04-28T21:34:01Z",
	     * //    "view_metadata": "metaData"
	     * //  }
	     */

	  }, {
	    key: "detectColumnTypes",
	    value: function detectColumnTypes(fileName, copyParams, callback) {
	      var thriftCopyParams = helpers.convertObjectToThriftCopyParams(copyParams);
	      this._client[0].detect_column_types(this._sessionId[0], fileName, thriftCopyParams, callback);
	    }

	    /**
	     * Asynchronously get the data from an importable file,
	     * such as a .csv or plaintext file with a header.
	     * @param {String} fileName - the name of the importable file
	     * @param {TCopyParams} copyParams - see {@link TCopyParams}
	     * @returns {Promise.<TDetectResult>} An object which has copy_params and row_set
	     *
	     * @example <caption>Get data from table_data.csv:</caption>
	     *
	     * var copyParams = new TCopyParams();
	     * con.detectColumnTypesAsync('table_data.csv', copyParams).then(res => console.log(res))
	     * // TDetectResult {row_set: TRowSet, copy_params: TCopyParams}
	     *
	     */

	  }, {
	    key: "detectColumnTypesAsync",
	    value: function detectColumnTypesAsync(fileName, copyParams) {
	      var _this7 = this;

	      return new Promise(function (resolve, reject) {
	        _this7.detectColumnTypes.bind(_this7, fileName, copyParams)(function (err, res) {
	          if (err) {
	            reject(err);
	          } else {
	            _this7.importerRowDesc = res.row_set.row_desc;
	            resolve(res);
	          }
	        });
	      });
	    }

	    /**
	     * Submit a query to the database and process the results.
	     * @param {String} query The query to perform
	     * @param {Object} options the options for the query
	     * @param {Function} callback that takes `(err, result) => result`
	     * @returns {Object} The result of the query
	     *
	     * @example <caption>create a query</caption>
	     *
	     * var query = "SELECT count(*) AS n FROM tweets_nov_feb WHERE country='CO'";
	     * var options = {};
	     *
	     * con.query(query, options, function(err, result) {
	     *        console.log(result)
	     *      });
	     *
	     */

	  }, {
	    key: "query",
	    value: function query(_query, options, callback) {
	      var _this8 = this;

	      var columnarResults = true;
	      var eliminateNullRows = false;
	      var queryId = null;
	      var returnTiming = false;
	      var limit = -1;
	      if (options) {
	        columnarResults = options.hasOwnProperty("columnarResults") ? options.columnarResults : columnarResults;
	        eliminateNullRows = options.hasOwnProperty("eliminateNullRows") ? options.eliminateNullRows : eliminateNullRows;
	        queryId = options.hasOwnProperty("queryId") ? options.queryId : queryId;
	        returnTiming = options.hasOwnProperty("returnTiming") ? options.returnTiming : returnTiming;
	        limit = options.hasOwnProperty("limit") ? options.limit : limit;
	      }

	      var lastQueryTime = queryId in this.queryTimes ? this.queryTimes[queryId] : this.DEFAULT_QUERY_TIME;

	      var curNonce = (this._nonce++).toString();

	      var conId = 0;

	      var processResultsOptions = {
	        returnTiming: returnTiming,
	        eliminateNullRows: eliminateNullRows,
	        query: _query,
	        queryId: queryId,
	        conId: conId,
	        estimatedQueryTime: lastQueryTime
	      };

	      try {
	        if (callback) {
	          this._client[conId].sql_execute(this._sessionId[conId], _query, columnarResults, curNonce, limit, function (error, result) {
	            if (error) {
	              callback(error);
	            } else {
	              _this8.processResults(processResultsOptions, result, callback);
	            }
	          });
	          return curNonce;
	        } else if (!callback) {
	          var SQLExecuteResult = this._client[conId].sql_execute(this._sessionId[conId], _query, columnarResults, curNonce, limit);
	          return this.processResults(processResultsOptions, SQLExecuteResult);
	        }
	      } catch (err) {
	        if (err.name === "NetworkError") {
	          this.removeConnection(conId);
	          if (this._numConnections === 0) {
	            err.msg = "No remaining database connections";
	            throw err;
	          }
	          this.query(_query, options, callback);
	        } else if (callback) {
	          callback(err);
	        } else {
	          throw err;
	        }
	      }
	    }

	    /** @deprecated will default to query */

	  }, {
	    key: "validateQuery",


	    /**
	     * Submit a query to validate whether the backend can create a result set based on the SQL statement.
	     * @param {String} query The query to perform
	     * @returns {Promise.<Object>} The result of whether the query is valid
	     *
	     * @example <caption>create a query</caption>
	     *
	     * var query = "SELECT count(*) AS n FROM tweets_nov_feb WHERE country='CO'";
	     *
	     * con.validateQuery(query).then(res => console.log(res))
	     *
	     * // [{
	     * //    "name": "n",
	     * //    "type": "INT",
	     * //    "is_array": false,
	     * //    "is_dict": false
	     * //  }]
	     *
	     */
	    value: function validateQuery(query) {
	      var _this9 = this;

	      return new Promise(function (resolve, reject) {
	        _this9._client[0].sql_validate(_this9._sessionId[0], query, function (error, res) {
	          if (error) {
	            reject(error);
	          } else {
	            resolve(_this9.convertFromThriftTypes(res));
	          }
	        });
	      });
	    }
	  }, {
	    key: "removeConnection",
	    value: function removeConnection(conId) {
	      if (conId < 0 || conId >= this.numConnections) {
	        var err = {
	          msg: "Remove connection id invalid"
	        };
	        throw err;
	      }
	      this._client.splice(conId, 1);
	      this._sessionId.splice(conId, 1);
	      this._numConnections--;
	    }
	  }, {
	    key: "getTables",
	    value: function getTables(callback) {
	      this._client[0].get_tables(this._sessionId[0], function (error, tables) {
	        if (error) {
	          callback(error);
	        } else {
	          callback(null, tables.map(function (table) {
	            return {
	              name: table,
	              label: "obs"
	            };
	          }));
	        }
	      });
	    }

	    /**
	     * Get the names of the databases that exist on the current session's connectdion.
	     * @return {Promise.<Object[]>} list of table objects containing the label and table names.
	     *
	     * @example <caption>Get the list of tables from a connection:</caption>
	     *
	     *  con.getTablesAsync().then(res => console.log(res))
	     *
	     *  //  [{
	     *  //    label: 'obs', // deprecated property
	     *  //    name: 'myDatabaseName'
	     *  //   },
	     *  //  ...]
	     */

	  }, {
	    key: "getTablesAsync",
	    value: function getTablesAsync() {
	      var _this10 = this;

	      return new Promise(function (resolve, reject) {
	        _this10.getTables.bind(_this10)(function (error, tables) {
	          if (error) {
	            reject(error);
	          } else {
	            resolve(tables);
	          }
	        });
	      });
	    }

	    /**
	     * Create an array-like object from {@link TDatumType} by
	     * flipping the string key and numerical value around.
	     *
	     * @returns {Undefined} This function does not return anything
	     */

	  }, {
	    key: "invertDatumTypes",
	    value: function invertDatumTypes() {
	      var datumType = TDatumType; // eslint-disable-line no-undef
	      for (var key in datumType) {
	        if (datumType.hasOwnProperty(key)) {
	          this._datumEnum[datumType[key]] = key;
	        }
	      }
	    }

	    /**
	     * Get a list of field objects for a given table.
	     * @param {String} tableName - name of table containing field names
	     * @param {Function} callback - (err, results)
	     * @return {Array<Object>} fields - the formmatted list of field objects
	     *
	     * @example <caption>Get the list of fields from a specific table:</caption>
	     *
	     * con.getFields('flights', (err, res) => console.log(res))
	     * // [{
	     *   name: 'fieldName',
	     *   type: 'BIGINT',
	     *   is_array: false,
	     *   is_dict: false
	     * }, ...]
	     */

	  }, {
	    key: "getFields",
	    value: function getFields(tableName, callback) {
	      var _this11 = this;

	      this._client[0].get_table_details(this._sessionId[0], tableName, function (error, fields) {
	        if (fields) {
	          var rowDict = fields.row_desc.reduce(function (accum, value) {
	            accum[value.col_name] = value;
	            return accum;
	          }, {});
	          callback(null, _this11.convertFromThriftTypes(rowDict));
	        } else {
	          callback(new Error("Table (" + tableName + ") not found" + error));
	        }
	      });
	    }
	  }, {
	    key: "createTable",
	    value: function createTable(tableName, rowDescObj, tableType, callback) {
	      if (!this._sessionId) {
	        throw new Error("You are not connected to a server. Try running the connect method first.");
	      }

	      var thriftRowDesc = helpers.mutateThriftRowDesc(rowDescObj, this.importerRowDesc);

	      for (var c = 0; c < this._numConnections; c++) {
	        this._client[c].create_table(this._sessionId[c], tableName, thriftRowDesc, tableType, function (err) {
	          if (err) {
	            callback(err);
	          } else {
	            callback();
	          }
	        });
	      }
	    }

	    /**
	     * Create a table and persist it to the backend.
	     * @param {String} tableName - desired name of the new table
	     * @param {Array<TColumnType>} rowDescObj - fields of the new table
	     * @param {Number<TTableType>} tableType - the types of tables a user can import into the db
	     * @return {Promise.<undefined>} it will either catch an error or return undefined on success
	     *
	     * @example <caption>Create a new table:</caption>
	     *
	     *  con.createTable('mynewtable', [TColumnType, TColumnType, ...], 0).then(res => console.log(res));
	     *  // undefined
	     */

	  }, {
	    key: "importTable",
	    value: function importTable(tableName, fileName, copyParams, rowDescObj, isShapeFile, callback) {
	      if (!this._sessionId) {
	        throw new Error("You are not connected to a server. Try running the connect method first.");
	      }

	      var thriftCopyParams = helpers.convertObjectToThriftCopyParams(copyParams);
	      var thriftRowDesc = helpers.mutateThriftRowDesc(rowDescObj, this.importerRowDesc);

	      var thriftCallBack = function thriftCallBack(err, res) {
	        if (err) {
	          callback(err);
	        } else {
	          callback(null, res);
	        }
	      };

	      for (var c = 0; c < this._numConnections; c++) {
	        if (isShapeFile) {
	          this._client[c].import_geo_table(this._sessionId[c], tableName, fileName, thriftCopyParams, thriftRowDesc, thriftCallBack);
	        } else {
	          this._client[c].import_table(this._sessionId[c], tableName, fileName, thriftCopyParams, thriftCallBack);
	        }
	      }
	    }
	  }, {
	    key: "importTableAsyncWrapper",
	    value: function importTableAsyncWrapper(isShapeFile) {
	      var _this12 = this;

	      return function (tableName, fileName, copyParams, headers) {
	        return new Promise(function (resolve, reject) {
	          _this12.importTable(tableName, fileName, copyParams, headers, isShapeFile, function (err, link) {
	            if (err) {
	              reject(err);
	            } else {
	              resolve(link);
	            }
	          });
	        });
	      };
	    }

	    /**
	     * Import a delimited table from a file.
	     * @param {String} tableName - desired name of the new table
	     * @param {String} fileName
	     * @param {TCopyParams} copyParams - see {@link TCopyParams}
	     * @param {TColumnType[]} headers -- a colleciton of metadata related to the table headers
	     */


	    /**
	     * Import a geo table from a file.
	     * @param {String} tableName - desired name of the new table
	     * @param {String} fileName
	     * @param {TCopyParams} copyParams - see {@link TCopyParams}
	     * @param {TColumnType[]} headers -- a colleciton of metadata related to the table headers
	     */

	  }, {
	    key: "renderVega",


	    /**
	     * Use for backend rendering. This method will fetch a PNG image
	     * that is a render of the vega json object.
	     *
	     * @param {Number} widgetid the widget id of the calling widget
	     * @param {String} vega the vega json
	     * @param {Object} options the options for the render query
	     * @param {Number} options.compressionLevel the png compression level.
	     *                  range 1 (low compression, faster) to 10 (high compression, slower).
	     *                  Default 3.
	     * @param {Function} callback takes `(err, success)` as its signature.  Returns con singleton on success.
	     *
	     * @returns {Image} Base 64 Image
	     */
	    value: function renderVega(widgetid, vega, options, callback) /* istanbul ignore next */{
	      var _this13 = this;

	      var queryId = null;
	      var compressionLevel = COMPRESSION_LEVEL_DEFAULT;
	      if (options) {
	        queryId = options.hasOwnProperty("queryId") ? options.queryId : queryId;
	        compressionLevel = options.hasOwnProperty("compressionLevel") ? options.compressionLevel : compressionLevel;
	      }

	      var lastQueryTime = queryId in this.queryTimes ? this.queryTimes[queryId] : this.DEFAULT_QUERY_TIME;

	      var curNonce = (this._nonce++).toString();

	      var conId = 0;
	      this._lastRenderCon = conId;

	      var processResultsOptions = {
	        isImage: true,
	        query: "render: " + vega,
	        queryId: queryId,
	        conId: conId,
	        estimatedQueryTime: lastQueryTime
	      };

	      try {
	        if (!callback) {
	          var renderResult = this._client[conId].render_vega(this._sessionId[conId], widgetid, vega, compressionLevel, curNonce);
	          return this.processResults(processResultsOptions, renderResult);
	        }

	        this._client[conId].render_vega(this._sessionId[conId], widgetid, vega, compressionLevel, curNonce, function (error, result) {
	          if (error) {
	            callback(error);
	          } else {
	            _this13.processResults(processResultsOptions, result, callback);
	          }
	        });
	      } catch (err) {
	        throw err;
	      }

	      return curNonce;
	    }

	    /**
	     * Used primarily for backend rendered maps, this method will fetch the row
	     * for a specific table that was last rendered at a pixel.
	     *
	     * @param {widgetId} Number - the widget id of the caller
	     * @param {TPixel} pixel - the pixel (lower left-hand corner is pixel (0,0))
	     * @param {String} tableName - the table containing the geo data
	     * @param {Object} tableColNamesMap - object of tableName -> array of col names
	     * @param {Array<Function>} callbacks
	     * @param {Number} [pixelRadius=2] - the radius around the primary pixel to search
	     */

	  }, {
	    key: "getResultRowForPixel",
	    value: function getResultRowForPixel(widgetId, pixel, tableColNamesMap, callbacks) /* istanbul ignore next */{
	      var pixelRadius = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;

	      var columnFormat = true; // BOOL
	      var curNonce = (this._nonce++).toString();
	      try {
	        if (!callbacks) {
	          return this.processPixelResults(undefined, // eslint-disable-line no-undefined
	          this._client[this._lastRenderCon].get_result_row_for_pixel(this._sessionId[this._lastRenderCon], widgetId, pixel, tableColNamesMap, columnFormat, pixelRadius, curNonce));
	        }
	        this._client[this._lastRenderCon].get_result_row_for_pixel(this._sessionId[this._lastRenderCon], widgetId, pixel, tableColNamesMap, columnFormat, pixelRadius, curNonce, this.processPixelResults.bind(this, callbacks));
	      } catch (err) {
	        throw err;
	      }
	      return curNonce;
	    }

	    /**
	     * Formats the pixel results into the same pattern as textual results.
	     *
	     * @param {Array<Function>} callbacks a collection of callbacks
	     * @param {Array|Object} results unformatted results of pixel rowId information
	     *
	     * @returns {Object} An object with the pixel results formatted for display
	     */

	  }, {
	    key: "processPixelResults",
	    value: function processPixelResults(callbacks, results) {
	      results = Array.isArray(results) ? results.pixel_rows : [results];
	      var numPixels = results.length;
	      var processResultsOptions = {
	        isImage: false,
	        eliminateNullRows: false,
	        query: "pixel request",
	        queryId: -2
	      };
	      for (var p = 0; p < numPixels; p++) {
	        results[p].row_set = this.processResults(processResultsOptions, results[p]);
	      }
	      if (!callbacks) {
	        return results;
	      }
	      callbacks.pop()(results, callbacks);
	    }

	    /**
	     * Get or set the session ID used by the server to serve the correct data.
	     * This is typically set by {@link connect} and should not be set manually.
	     * @param {Number} sessionId - The session ID of the current connection
	     * @return {Number|MapdCon} - The session ID or the MapdCon itself
	     *
	     * @example <caption>Get the session id:</caption>
	     *
	     *  con.sessionId();
	     * // sessionID === 3145846410
	     *
	     * @example <caption>Set the session id:</caption>
	     * var con = new MapdCon().connect().sessionId(3415846410);
	     * // NOTE: It is generally unsafe to set the session id manually.
	     */

	  }, {
	    key: "sessionId",
	    value: function sessionId(_sessionId) {
	      if (!arguments.length) {
	        return this._sessionId;
	      }
	      this._sessionId = _sessionId;
	      return this;
	    }

	    /**
	     * Get or set the connection server hostname.
	     * This is is typically the first method called after instantiating a new MapdCon.
	     * @param {String} host - The hostname address
	     * @return {String|MapdCon} - The hostname or the MapdCon itself
	     *
	     * @example <caption>Set the hostname:</caption>
	     * var con = new MapdCon().host('localhost');
	     *
	     * @example <caption>Get the hostname:</caption>
	     * var host = con.host();
	     * // host === 'localhost'
	     */

	  }, {
	    key: "host",
	    value: function host(_host) {
	      if (!arguments.length) {
	        return this._host;
	      }
	      this._host = arrayify(_host);
	      return this;
	    }

	    /**
	     * Get or set the connection port.
	     * @param {String} port - The port to connect on
	     * @return {String|MapdCon} - The port or the MapdCon itself
	     *
	     * @example <caption>Set the port:</caption>
	     * var con = new MapdCon().port('8080');
	     *
	     * @example <caption>Get the port:</caption>
	     * var port = con.port();
	     * // port === '8080'
	     */

	  }, {
	    key: "port",
	    value: function port(_port) {
	      if (!arguments.length) {
	        return this._port;
	      }
	      this._port = arrayify(_port);
	      return this;
	    }

	    /**
	     * Get or set the username to authenticate with.
	     * @param {String} user - The username to authenticate with
	     * @return {String|MapdCon} - The username or the MapdCon itself
	     *
	     * @example <caption>Set the username:</caption>
	     * var con = new MapdCon().user('foo');
	     *
	     * @example <caption>Get the username:</caption>
	     * var username = con.user();
	     * // user === 'foo'
	     */

	  }, {
	    key: "user",
	    value: function user(_user) {
	      if (!arguments.length) {
	        return this._user;
	      }
	      this._user = arrayify(_user);
	      return this;
	    }

	    /**
	     * Get or set the user's password to authenticate with.
	     * @param {String} password - The password to authenticate with
	     * @return {String|MapdCon} - The password or the MapdCon itself
	     *
	     * @example <caption>Set the password:</caption>
	     * var con = new MapdCon().password('bar');
	     *
	     * @example <caption>Get the username:</caption>
	     * var password = con.password();
	     * // password === 'bar'
	     */

	  }, {
	    key: "password",
	    value: function password(_password) {
	      if (!arguments.length) {
	        return this._password;
	      }
	      this._password = arrayify(_password);
	      return this;
	    }

	    /**
	     * Get or set the name of the database to connect to.
	     * @param {String} dbName - The database to connect to
	     * @return {String|MapdCon} - The name of the database or the MapdCon itself
	     *
	     * @example <caption>Set the database name:</caption>
	     * var con = new MapdCon().dbName('myDatabase');
	     *
	     * @example <caption>Get the database name:</caption>
	     * var dbName = con.dbName();
	     * // dbName === 'myDatabase'
	     */

	  }, {
	    key: "dbName",
	    value: function dbName(_dbName) {
	      if (!arguments.length) {
	        return this._dbName;
	      }
	      this._dbName = arrayify(_dbName);
	      return this;
	    }

	    /**
	     * Whether the raw queries strings will be logged to the console.
	     * Used primarily for debugging and defaults to <code>false</code>.
	     * @param {Boolean} logging - Set to true to enable logging
	     * @return {Boolean|MapdCon} - The current logging flag or MapdCon itself
	     *
	     * @example <caption>Set logging to true:</caption>
	     * var con = new MapdCon().logging(true);
	     *
	     * @example <caption>Get the logging flag:</caption>
	     * var isLogging = con.logging();
	     * // isLogging === true
	     */

	  }, {
	    key: "logging",
	    value: function logging(_logging) {
	      if (typeof _logging === "undefined") {
	        return this._logging;
	      } else if (typeof _logging !== "boolean") {
	        return "logging can only be set with boolean values";
	      }
	      this._logging = _logging;
	      var isEnabledTxt = _logging ? "enabled" : "disabled";
	      return "SQL logging is now " + isEnabledTxt;
	    }

	    /**
	     * The name of the platform.
	     * @param {String} platform - The platform, default is "mapd"
	     * @return {String|MapdCon} - The platform or the MapdCon itself
	     *
	     * @example <caption>Set the platform name:</caption>
	     * var con = new MapdCon().platform('myPlatform');
	     *
	     * @example <caption>Get the platform name:</caption>
	     * var platform = con.platform();
	     * // platform === 'myPlatform'
	     */

	  }, {
	    key: "platform",
	    value: function platform(_platform) {
	      if (!arguments.length) {
	        return this._platform;
	      }
	      this._platform = _platform;
	      return this;
	    }

	    /**
	     * Get the number of connections that are currently open.
	     * @return {Number} - number of open connections
	     *
	     * @example <caption>Get the number of connections:</caption>
	     *
	     * var numConnections = con.numConnections();
	     * // numConnections === 1
	     */

	  }, {
	    key: "numConnections",
	    value: function numConnections() {
	      return this._numConnections;
	    }

	    /**
	     * The protocol to use for requests.
	     * @param {String} protocol - http or https
	     * @return {String|MapdCon} - protocol or MapdCon itself
	     *
	     * @example <caption>Set the protocol:</caption>
	     * var con = new MapdCon().protocol('http');
	     *
	     * @example <caption>Get the protocol:</caption>
	     * var protocol = con.protocol();
	     * // protocol === 'http'
	     */

	  }, {
	    key: "protocol",
	    value: function protocol(_protocol) {
	      if (!arguments.length) {
	        return this._protocol;
	      }
	      this._protocol = arrayify(_protocol);
	      return this;
	    }

	    /**
	     * Generates a list of endpoints from the connection params.
	     * @return {Array<String>} - list of endpoints
	     *
	     * @example <caption>Get the endpoints:</caption>
	     * var con = new MapdCon().protocol('http').host('localhost').port('8000');
	     * var endpoints = con.getEndpoints();
	     * // endpoints === [ 'http://localhost:8000' ]
	     */

	  }, {
	    key: "getEndpoints",
	    value: function getEndpoints() {
	      var _this14 = this;

	      return this._host.map(function (host, i) {
	        return _this14._protocol[i] + "://" + host + ":" + _this14._port[i];
	      });
	    }
	  }]);

	  return MapdCon;
	}();

	// Set a global mapdcon function when mapdcon is brought in via script tag.


	if (( false ? "undefined" : _typeof(module)) === "object" && module.exports) {
	  if (!isNodeRuntime()) {
	    window.MapdCon = MapdCon;
	  }
	}

	exports.default = MapdCon;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(55)(module)))

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }),
/* 56 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var convertObjectToThriftCopyParams = exports.convertObjectToThriftCopyParams = function convertObjectToThriftCopyParams(obj) {
	  return new TCopyParams(obj);
	}; // eslint-disable-line no-undef

	var mutateThriftRowDesc = exports.mutateThriftRowDesc = function mutateThriftRowDesc(rowDescArray, thriftRowDescArray) {
	  rowDescArray.forEach(function (obj, i) {
	    thriftRowDescArray[i].col_name = obj.clean_col_name;
	    thriftRowDescArray[i].col_type.encoding = obj.col_type.encoding;
	    thriftRowDescArray[i].col_type.type = obj.col_type.type;
	  });
	  return thriftRowDescArray;
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = MapDClientV2;

	var _wrapWithErrorHandling = __webpack_require__(58);

	var MapDClient = typeof window !== "undefined" && window.MapDClient || __webpack_require__(53).Client; // eslint-disable-line global-require

	function MapDClientV2(protocol) {
	  MapDClient.call(this, protocol);
	}

	MapDClientV2.prototype = Object.create(MapDClient.prototype);

	MapDClientV2.prototype.connect = function () {
	  var connectWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "connect");
	  return connectWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.sql_execute = function () {
	  var SQLExecuteWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "sql_execute");
	  return SQLExecuteWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.sql_validate = function () {
	  var SQLValidateWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "sql_validate");
	  return SQLValidateWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.render = function () {
	  var renderWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "render");
	  return renderWithErrorHandling.apply(undefined, arguments);
	};

	/* istanbul ignore next */
	MapDClientV2.prototype.render_vega = function () {
	  var renderVegaWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "render_vega");
	  return renderVegaWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.delete_frontend_view = function () {
	  var deleteFrontendViewWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "delete_frontend_view");
	  return deleteFrontendViewWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.get_tables = function () {
	  var getTablesWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "get_tables");
	  return getTablesWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.get_table_details = function () {
	  var getTableDetailsWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "get_table_details");
	  return getTableDetailsWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.get_fields = function () {
	  var getFieldsWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "get_fields");
	  return getFieldsWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.get_server_status = function () {
	  var getServerStatusWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "get_server_status");
	  return getServerStatusWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.get_frontend_views = function () {
	  var getFrontEndViewsWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "get_frontend_views");
	  return getFrontEndViewsWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.get_frontend_view = function () {
	  var getFrontEndViewWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "get_frontend_view");
	  return getFrontEndViewWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.create_link = function () {
	  var createLinkWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "create_link");
	  return createLinkWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.get_link_view = function () {
	  var getLinkViewWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "get_link_view");
	  return getLinkViewWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.detect_column_types = function () {
	  var detectColumnTypesWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "detect_column_types");
	  return detectColumnTypesWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.create_frontend_view = function () {
	  var createFrontEndViewWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "create_frontend_view");
	  return createFrontEndViewWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.send_create_table = function () {
	  var sendCreateTableWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "send_create_table");
	  return sendCreateTableWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.send_import_table = function () {
	  var sendImportTableWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "send_import_table");
	  return sendImportTableWithErrorHandling.apply(undefined, arguments);
	};

	MapDClientV2.prototype.detect_column_types = function () {
	  var detectColumnTypesWithErrorHandling = (0, _wrapWithErrorHandling.wrapWithErrorHandling)(this, "detect_column_types");
	  return detectColumnTypesWithErrorHandling.apply(undefined, arguments);
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isResultError = isResultError;
	exports.createResultError = createResultError;
	exports.wrapMethod = wrapMethod;
	exports.wrapWithErrorHandling = wrapWithErrorHandling;
	var MapDClient = typeof window !== "undefined" && window.MapDClient || __webpack_require__(53).Client; // eslint-disable-line global-require
	var TMapDException = typeof window !== "undefined" && window.TMapDException || __webpack_require__(52).TMapDException; // eslint-disable-line global-require
	var Thrift = typeof window !== "undefined" && window.Thrift || __webpack_require__(1).Thrift; // eslint-disable-line global-require

	function isResultError(result) {
	  return result instanceof Thrift.TException || result instanceof Error;
	}

	function createResultError(result) {
	  if (result instanceof TMapDException) {
	    return new Error(result.error_msg);
	  } else if (typeof result.message === "undefined") {
	    return new Error("Unspecified Error");
	  } else {
	    return new Error(result.message);
	  }
	}

	function wrapMethod(context, method, isError) {
	  // eslint-disable-line consistent-this
	  return function wrapped() {
	    var arity = MapDClient.prototype[method].length;

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    if (args.length === arity) {
	      var _MapDClient$prototype;

	      var callback = args.pop();
	      (_MapDClient$prototype = MapDClient.prototype[method]).call.apply(_MapDClient$prototype, [context].concat(args, [function (result) {
	        if (isError(result)) {
	          callback(createResultError(result));
	        } else {
	          callback(null, result);
	        }
	      }]));
	    } else if (args.length === arity - 1) {
	      var _MapDClient$prototype2;

	      var result = (_MapDClient$prototype2 = MapDClient.prototype[method]).call.apply(_MapDClient$prototype2, [context].concat(args));
	      if (isError(result)) {
	        throw createResultError(result);
	      }
	      return result;
	    } else {
	      throw new Error("Insufficient arguments to run this method " + method);
	    }
	  };
	}

	function wrapWithErrorHandling(context, method) {
	  // eslint-disable-line consistent-this
	  return wrapMethod(context, method, isResultError);
	}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = processQueryResults;

	var _processColumnarResults = __webpack_require__(60);

	var _processColumnarResults2 = _interopRequireDefault(_processColumnarResults);

	var _processRowResults = __webpack_require__(61);

	var _processRowResults2 = _interopRequireDefault(_processRowResults);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	   * Decides how to process raw results once they come back from the server.
	   *
	   * @param {Boolean} logging if enabled, will show how long the query took to execute in console
	   * @param {Function} updateQueryTimes A function that updates internal query times on connector
	   * @param {Object} options A list of options for processing the results
	   * @param {Boolean} options.isImage Set to true when querying for backend rendered images
	   * @param {Boolean} options.eliminateNullRows Removes null rows
	   * @param {String} options.query The SQL query string used only for logging
	   * @param {Number} options.queryId The ID of the query
	   * @param {Number} options.conId The unique connector identification
	   * @param {String} options.estimatedQueryTime The estimate of the query time
	   * @param {Array<Function>} the same callback coming from {@link #query}
	   * @param {Object} result - The query result used to decide whether to process
	   *                          as column or row results.
	   * @return {Object} null if image with callbacks, result if image with callbacks,
	   *                  otherwise formatted results
	   */
	function processQueryResults(logging, updateQueryTimes) {
	  return function (options, _datumEnum, result, callback) {
	    var isImage = false;
	    var eliminateNullRows = false;
	    var query = null;
	    var queryId = null;
	    var conId = null;
	    var estimatedQueryTime = null;
	    var hasCallback = Boolean(callback);

	    if (typeof options !== "undefined") {
	      isImage = options.isImage ? options.isImage : false;
	      eliminateNullRows = options.eliminateNullRows ? options.eliminateNullRows : false;
	      query = options.query ? options.query : null;
	      queryId = options.queryId ? options.queryId : null;
	      conId = typeof options.conId === "undefined" ? null : options.conId;
	      estimatedQueryTime = typeof options.estimatedQueryTime === "undefined" ? null : options.estimatedQueryTime;
	    }
	    if (result.execution_time_ms && conId !== null && estimatedQueryTime !== null) {
	      updateQueryTimes(conId, queryId, estimatedQueryTime, result.execution_time_ms);
	    }

	    // should use node_env
	    if (logging && result.execution_time_ms) {
	      console.log(query, "on Server", conId, "- Execution Time:", result.execution_time_ms, " ms, Total Time:", result.total_time_ms + "ms");
	    }

	    if (isImage && hasCallback) {
	      callback(null, result);
	    } else if (isImage && !hasCallback) {
	      return result;
	    } else {
	      var formattedResult = null;

	      if (!result.row_set) {
	        if (hasCallback) {
	          callback(new Error("No result to process"));
	        } else {
	          throw new Error("No result to process");
	        }
	        return;
	      }

	      if (result.row_set.is_columnar) {
	        formattedResult = (0, _processColumnarResults2.default)(result.row_set, eliminateNullRows, _datumEnum);
	      } else {
	        formattedResult = (0, _processRowResults2.default)(result.row_set, eliminateNullRows, _datumEnum);
	      }

	      formattedResult.timing = {
	        execution_time_ms: result.execution_time_ms,
	        total_time_ms: result.total_time_ms
	      };

	      if (hasCallback) {
	        callback(null, options.returnTiming ? formattedResult : formattedResult.results);
	      } else {
	        return options.returnTiming ? formattedResult : formattedResult.results;
	      }
	    }
	  };
	}

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = processColumnarResults;
	/**
	   * Because it is inefficient for the server to return a row-based
	   * data structure, it is better to process the column-based results into a row-based
	   * format after the fact.
	   *
	   * @param {TRowSet} data The column-based data returned from a query
	   * @param {Boolean} eliminateNullRows A flag that allows removal of null rows from results
	   * @param {Object} dataEnum A list of types created from when executing {@link #invertDatumTypes}
	   * @returns {Object} processedResults The formatted results of the query
	   */
	function processColumnarResults(data, eliminateNullRows, dataEnum) {
	  var formattedResult = { fields: [], results: [] };
	  var numCols = data.row_desc.length;
	  var numRows = typeof data.columns[0] === "undefined" ? 0 : data.columns[0].nulls.length;

	  formattedResult.fields = data.row_desc.map(function (field) {
	    return {
	      name: field.col_name,
	      type: dataEnum[field.col_type.type],
	      is_array: field.col_type.is_array
	    };
	  });

	  for (var r = 0; r < numRows; r++) {
	    if (eliminateNullRows) {
	      var rowHasNull = false;
	      for (var c = 0; c < numCols; c++) {
	        if (data.columns[c].nulls[r]) {
	          rowHasNull = true;
	          break;
	        }
	      }
	      if (rowHasNull) {
	        continue; // eslint-disable-line no-continue
	      }
	    }
	    var row = {};
	    for (var _c = 0; _c < numCols; _c++) {
	      var fieldName = formattedResult.fields[_c].name;
	      var fieldType = formattedResult.fields[_c].type;
	      var fieldIsArray = formattedResult.fields[_c].is_array;
	      var isNull = data.columns[_c].nulls[r];
	      if (isNull) {
	        // row[fieldName] = "NULL";
	        row[fieldName] = null;
	        continue; // eslint-disable-line no-continue
	      }
	      if (fieldIsArray) {
	        row[fieldName] = [];
	        var arrayNumElems = data.columns[_c].data.arr_col[r].nulls.length;
	        for (var e = 0; e < arrayNumElems; e++) {
	          if (data.columns[_c].data.arr_col[r].nulls[e]) {
	            row[fieldName].push("NULL");
	            continue; // eslint-disable-line no-continue
	          }
	          switch (fieldType) {
	            case "BOOL":
	              row[fieldName].push(Boolean(data.columns[_c].data.arr_col[r].data.int_col[e]));
	              break;
	            case "SMALLINT":
	            case "INT":
	            case "BIGINT":
	              row[fieldName].push(data.columns[_c].data.arr_col[r].data.int_col[e]);
	              break;
	            case "FLOAT":
	            case "DOUBLE":
	            case "DECIMAL":
	              row[fieldName].push(data.columns[_c].data.arr_col[r].data.real_col[e]);
	              break;
	            case "STR":
	              row[fieldName].push(data.columns[_c].data.arr_col[r].data.str_col[e]);
	              break;
	            case "TIME":
	            case "TIMESTAMP":
	            case "DATE":
	              row[fieldName].push(data.columns[_c].data.arr_col[r].data.int_col[e] * 1000); // eslint-disable-line no-magic-numbers
	              break;
	            default:
	              break;
	          }
	        }
	      } else {
	        switch (fieldType) {
	          case "BOOL":
	            row[fieldName] = Boolean(data.columns[_c].data.int_col[r]);
	            break;
	          case "SMALLINT":
	          case "INT":
	          case "BIGINT":
	            row[fieldName] = data.columns[_c].data.int_col[r];
	            break;
	          case "FLOAT":
	          case "DOUBLE":
	          case "DECIMAL":
	            row[fieldName] = data.columns[_c].data.real_col[r];
	            break;
	          case "STR":
	            row[fieldName] = data.columns[_c].data.str_col[r];
	            break;
	          case "TIME":
	          case "TIMESTAMP":
	          case "DATE":
	            row[fieldName] = new Date(data.columns[_c].data.int_col[r] * 1000); // eslint-disable-line no-magic-numbers
	            break;
	          default:
	            break;
	        }
	      }
	    }
	    formattedResult.results.push(row);
	  }
	  return formattedResult;
	}

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = processRowResults;
	/**
	   * It should be avoided to query for row-based results from the server, howerver
	   * it can still be done. In this case, still process them into the same format as
	   * (@link processColumnarResults} to keep the output consistent.
	   * @param {TRowSet} data - The row-based data returned from a query
	   * @param {Boolean} eliminateNullRows A flag that allows removal of null rows from results
	   * @param {Object} datumEnum A list of types created from when executing {@link #invertDatumTypes}
	   * @returns {Object} processedResults
	   */
	function processRowResults(data, eliminateNullRows, datumEnum) {
	  var numCols = data.row_desc.length;
	  var formattedResult = { fields: [], results: [] };

	  formattedResult.fields = data.row_desc.map(function (field) {
	    return {
	      name: field.col_name,
	      type: datumEnum[field.col_type.type],
	      is_array: field.col_type.is_array
	    };
	  });

	  formattedResult.results = [];
	  var numRows = 0;
	  if (typeof data.rows !== "undefined" && data.rows !== null) {
	    numRows = data.rows.length; // so won't throw if data.rows is missing
	  }

	  for (var r = 0; r < numRows; r++) {
	    if (eliminateNullRows) {
	      var rowHasNull = false;
	      for (var c = 0; c < numCols; c++) {
	        if (data.rows[r].columns[c].is_null) {
	          rowHasNull = true;
	          break;
	        }
	      }
	      if (rowHasNull) {
	        continue; // eslint-disable-line no-continue
	      }
	    }

	    var row = {};
	    for (var _c = 0; _c < numCols; _c++) {
	      var fieldName = formattedResult.fields[_c].name;
	      var fieldType = formattedResult.fields[_c].type;
	      var fieldIsArray = formattedResult.fields[_c].is_array;
	      if (fieldIsArray) {
	        if (data.rows[r].cols[_c].is_null) {
	          row[fieldName] = "NULL";
	          continue; // eslint-disable-line no-continue
	        }
	        row[fieldName] = [];
	        var arrayNumElems = data.rows[r].cols[_c].val.arr_val.length;
	        for (var e = 0; e < arrayNumElems; e++) {
	          var elemDatum = data.rows[r].cols[_c].val.arr_val[e];
	          if (elemDatum.is_null) {
	            row[fieldName].push("NULL");
	            continue; // eslint-disable-line no-continue
	          }
	          switch (fieldType) {
	            case "BOOL":
	              row[fieldName].push(Boolean(elemDatum.val.int_val));
	              break;
	            case "SMALLINT":
	            case "INT":
	            case "BIGINT":
	              row[fieldName].push(elemDatum.val.int_val);
	              break;
	            case "FLOAT":
	            case "DOUBLE":
	            case "DECIMAL":
	              row[fieldName].push(elemDatum.val.real_val);
	              break;
	            case "STR":
	              row[fieldName].push(elemDatum.val.str_val);
	              break;
	            case "TIME":
	            case "TIMESTAMP":
	            case "DATE":
	              row[fieldName].push(elemDatum.val.int_val * 1000); // eslint-disable-line no-magic-numbers
	              break;
	            default:
	              break;
	          }
	        }
	      } else {
	        var scalarDatum = data.rows[r].cols[_c];
	        if (scalarDatum.is_null) {
	          row[fieldName] = "NULL";
	          continue; // eslint-disable-line no-continue
	        }
	        switch (fieldType) {
	          case "BOOL":
	            row[fieldName] = Boolean(scalarDatum.val.int_val);
	            break;
	          case "SMALLINT":
	          case "INT":
	          case "BIGINT":
	            row[fieldName] = scalarDatum.val.int_val;
	            break;
	          case "FLOAT":
	          case "DOUBLE":
	          case "DECIMAL":
	            row[fieldName] = scalarDatum.val.real_val;
	            break;
	          case "STR":
	            row[fieldName] = scalarDatum.val.str_val;
	            break;
	          case "TIME":
	          case "TIMESTAMP":
	          case "DATE":
	            row[fieldName] = new Date(scalarDatum.val.int_val * 1000); // eslint-disable-line no-magic-numbers
	            break;
	          default:
	            break;
	        }
	      }
	    }
	    formattedResult.results.push(row);
	  }
	  return formattedResult;
	}

/***/ })
/******/ ]);