/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export var /** @type {?} */ DecAppInitializer = function (decConfig, decApi) {
    return function () {
        return new Promise(function (resolve, reject) {
            decConfig.loadConfig().then(function (configuration) {
                decApi.handShake().then(function (account) {
                    console.log('DecAppInitializer handShake');
                    resolve({
                        configuration: configuration,
                        account: account,
                    });
                });
            });
        });
    };
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWFwcC1pbml0aWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaW5pdGlhbGl6ZXIvZGVjLWFwcC1pbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBTSxDQUFDLHFCQUFNLGlCQUFpQixHQUFHLFVBQUMsU0FBa0MsRUFBRSxNQUFxQjtJQUV6RixNQUFNLENBQUM7UUFFTCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUVqQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsYUFBYTtnQkFFeEMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87b0JBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztvQkFFM0MsT0FBTyxDQUFDO3dCQUNOLGFBQWEsZUFBQTt3QkFDYixPQUFPLFNBQUE7cUJBQ1IsQ0FBQyxDQUFDO2lCQUVKLENBQUMsQ0FBQzthQUVKLENBQUMsQ0FBQztTQUVKLENBQUMsQ0FBQztLQUVKLENBQUM7Q0FFSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVjQXBpU2VydmljZSB9IGZyb20gJy4vLi4vYXBpL2RlY29yYS1hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBEZWNDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vLi4vY29uZmlndXJhdGlvbi9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuXG5leHBvcnQgY29uc3QgRGVjQXBwSW5pdGlhbGl6ZXIgPSAoZGVjQ29uZmlnOiBEZWNDb25maWd1cmF0aW9uU2VydmljZSwgZGVjQXBpOiBEZWNBcGlTZXJ2aWNlKSA9PiB7XG5cbiAgcmV0dXJuICgpID0+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgIGRlY0NvbmZpZy5sb2FkQ29uZmlnKCkudGhlbigoY29uZmlndXJhdGlvbikgPT4ge1xuXG4gICAgICAgIGRlY0FwaS5oYW5kU2hha2UoKS50aGVuKChhY2NvdW50KSA9PiB7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZygnRGVjQXBwSW5pdGlhbGl6ZXIgaGFuZFNoYWtlJyk7XG5cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICBhY2NvdW50LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH07XG5cbn07XG4iXX0=