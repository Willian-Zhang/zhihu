/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  14-11-10
 * @description
 *
 */
var request = require('request-promise'),
cheerio     = require('cheerio'),
config      = require('./config'),
url         = require('url'),
_           = require('lodash');

function formatFollowData(str) {
  if (str.indexOf('K') !== -1) {
    return parseInt(str) * 1000;
  }
  if (str.indexOf('K') !== -1) {
    return parseInt(str) * 10000;
  }
  return parseInt(str);
}
var getUserByName = function (name) {
  var data = {
    url: config.user.info,
    qs : {
      params: JSON.stringify({url_token: name})
    }
  };
  return request(data).then(function (content) {
    var $ = cheerio.load(content);

    var avatar = $('a.avatar-link');
    if(avatar.length == 0){
      return null;
    }
    var values = $("span.value");
    var result = {
      answer  : formatFollowData(values.eq(0).text()),
      post    : formatFollowData(values.eq(1).text()),
      follower: formatFollowData(values.eq(2).text())
    };
    result.profileUrl = config.zhihu + avatar.attr('href');
    result.avatarUrl = config.zhihu + avatar.attr('src');
    result.name = $('span.name').text();
    var male = $('.icon-profile-female');
    result.sex = male.length === 1 ? 'female' : 'male';
    return result;
  });
}

var questions = function (qID) {

}
var answers = function (qID) {

}
var zhuanlansFocus = function () {

}
var topic = function () {

}

module.exports = {
  getUserByName : getUserByName,
  zhuanlansFocus: zhuanlansFocus,
  question      : questions,
  answers       : answers,
  topic         : topic
}
