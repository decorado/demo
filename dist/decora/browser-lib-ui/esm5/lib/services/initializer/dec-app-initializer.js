/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export var /** @type {?} */ DecAppInitializer = function (decConfig, decApi) {
    return function () {
        return new Promise(function (resolve, reject) {
            decConfig.loadConfig().then(function (configuration) {
                decApi.handShake().then(function (account) {
                    resolve({
                        configuration: configuration,
                        account: account,
                    });
                }, function (err) {
                    resolve({
                        configuration: configuration,
                        account: undefined,
                    });
                });
            });
        });
    };
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWFwcC1pbml0aWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaW5pdGlhbGl6ZXIvZGVjLWFwcC1pbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBTSxDQUFDLHFCQUFNLGlCQUFpQixHQUFHLFVBQUMsU0FBa0MsRUFBRSxNQUFxQjtJQUV6RixNQUFNLENBQUM7UUFFTCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUVqQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsYUFBYTtnQkFFeEMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87b0JBRTlCLE9BQU8sQ0FBQzt3QkFDTixhQUFhLGVBQUE7d0JBQ2IsT0FBTyxTQUFBO3FCQUNSLENBQUMsQ0FBQztpQkFFSixFQUFFLFVBQUMsR0FBRztvQkFFTCxPQUFPLENBQUM7d0JBQ04sYUFBYSxlQUFBO3dCQUNiLE9BQU8sRUFBRSxTQUFTO3FCQUNuQixDQUFDLENBQUM7aUJBRUosQ0FBQyxDQUFDO2FBRUosQ0FBQyxDQUFDO1NBRUosQ0FBQyxDQUFDO0tBRUosQ0FBQztDQUVILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWNBcGlTZXJ2aWNlIH0gZnJvbSAnLi8uLi9hcGkvZGVjb3JhLWFwaS5zZXJ2aWNlJztcbmltcG9ydCB7IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi8uLi9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24uc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBEZWNBcHBJbml0aWFsaXplciA9IChkZWNDb25maWc6IERlY0NvbmZpZ3VyYXRpb25TZXJ2aWNlLCBkZWNBcGk6IERlY0FwaVNlcnZpY2UpID0+IHtcblxuICByZXR1cm4gKCkgPT4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgZGVjQ29uZmlnLmxvYWRDb25maWcoKS50aGVuKChjb25maWd1cmF0aW9uKSA9PiB7XG5cbiAgICAgICAgZGVjQXBpLmhhbmRTaGFrZSgpLnRoZW4oKGFjY291bnQpID0+IHtcblxuICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgY29uZmlndXJhdGlvbixcbiAgICAgICAgICAgIGFjY291bnQsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgKGVycikgPT4ge1xuXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgYWNjb3VudDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIH07XG5cbn07XG4iXX0=