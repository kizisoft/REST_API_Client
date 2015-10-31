'use strict';

app.factory('notifier', function () {
    var Notifier = Notifier || {};
    (function (Scope) {
        var _iconsType = {
                glyph: {
                    success: 'glyphicon glyphicon-ok-sign',
                    error: 'glyphicon glyphicon-exclamation-sign',
                    warning: 'glyphicon glyphicon-alert',
                    info: 'glyphicon glyphicon-info-sign'
                },
                fa: {
                    success: 'fa fa-check-circle',
                    error: 'fa fa-exclamation-circle',
                    warning: 'fa fa-exclamation-triangle',
                    info: 'fa fa-info-circle'
                }
            },
            _defaults = {
                isSticky: false,
                stayTime: 3000,
                iconsType: 'glyph',
                onClose: null
            };

        function getWrapper() {
            var $wrapper = $('.notifier-wrapper');
            return $wrapper.length ? $wrapper : $('<div class="notifier-wrapper"/>').appendTo('body');
        }

        function appendItem(type, message, options) {
            var _localDefaults = $.extend({}, _defaults, options);
            var $wrapper = getWrapper();
            var $item = $('<div class="notifier-item-wrapper notifier-' + type +
                '"><div class="notifier-icon-wrapper"><span class="' + _iconsType[_localDefaults.iconsType][type] +
                '"></span></div><p class="notifier-item-message">' + message + '</p></div>');

            $wrapper.append($item);
            if (_localDefaults.isSticky) {
                $item.one('click', function () {
                    removeItem($wrapper, $item, _localDefaults.onClose);
                });
            } else {
                setTimeout(function () {
                    removeItem($wrapper, $item, _localDefaults.onClose);
                }, _localDefaults.stayTime);
            }
        }

        function removeItem($wrapper, $item, onClose) {
            $item.animate({opacity: '0'}, 600, function () {
                $item.css('border', 'none');
                $item.animate({height: 0, padding: 0}, 400, function () {
                    $item.remove();
                    if ($('.notifier-item-wrapper').length === 0) {
                        $wrapper.remove();
                    }

                    if (typeof onClose === 'function') {
                        onClose();
                    }
                });
            });
        }

        Scope.notifySuccess = function notifySuccess(message, options) {
            appendItem('success', message, options);
        };
        Scope.notifyError = function notifyError(message, options) {
            appendItem('error', message, options);
        };
        Scope.notifyWarning = function notifyWarning(message, options) {
            appendItem('warning', message, options);
        };
        Scope.notifyInfo = function notifyInfo(message, options) {
            appendItem('info', message, options);
        };
    }(Notifier));

    return Notifier;
});