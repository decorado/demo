/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
export var DecAppInitializer = function (decConfig, decApi) {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWFwcC1pbml0aWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaW5pdGlhbGl6ZXIvZGVjLWFwcC1pbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLFdBQWEsaUJBQWlCLEdBQUcsVUFBQyxTQUFrQyxFQUFFLE1BQXFCO0lBRXpGLE1BQU0sQ0FBQztRQUVMLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBRWpDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxhQUFhO2dCQUV4QyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTztvQkFFOUIsT0FBTyxDQUFDO3dCQUNOLGFBQWEsZUFBQTt3QkFDYixPQUFPLFNBQUE7cUJBQ1IsQ0FBQyxDQUFDO2lCQUVKLEVBQUUsVUFBQyxHQUFHO29CQUVMLE9BQU8sQ0FBQzt3QkFDTixhQUFhLGVBQUE7d0JBQ2IsT0FBTyxFQUFFLFNBQVM7cUJBQ25CLENBQUMsQ0FBQztpQkFFSixDQUFDLENBQUM7YUFFSixDQUFDLENBQUM7U0FFSixDQUFDLENBQUM7S0FFSixDQUFDO0NBRUgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IERlY0FwcEluaXRpYWxpemVyID0gKGRlY0NvbmZpZzogRGVjQ29uZmlndXJhdGlvblNlcnZpY2UsIGRlY0FwaTogRGVjQXBpU2VydmljZSkgPT4ge1xuXG4gIHJldHVybiAoKSA9PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBkZWNDb25maWcubG9hZENvbmZpZygpLnRoZW4oKGNvbmZpZ3VyYXRpb24pID0+IHtcblxuICAgICAgICBkZWNBcGkuaGFuZFNoYWtlKCkudGhlbigoYWNjb3VudCkgPT4ge1xuXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgYWNjb3VudCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9LCAoZXJyKSA9PiB7XG5cbiAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24sXG4gICAgICAgICAgICBhY2NvdW50OiB1bmRlZmluZWQsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgfTtcblxufTtcbiJdfQ==