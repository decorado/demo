/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export const /** @type {?} */ DecAppInitializer = (decConfig, decApi) => {
    return () => {
        return new Promise((resolve, reject) => {
            decConfig.loadConfig().then((configuration) => {
                decApi.handShake().then((account) => {
                    console.log('DecAppInitializer handShake');
                    resolve({
                        configuration,
                        account,
                    });
                });
            });
        });
    };
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjLWFwcC1pbml0aWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BkZWNvcmEvYnJvd3Nlci1saWItdWkvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvaW5pdGlhbGl6ZXIvZGVjLWFwcC1pbml0aWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBR0EsTUFBTSxDQUFDLHVCQUFNLGlCQUFpQixHQUFHLENBQUMsU0FBa0MsRUFBRSxNQUFxQixFQUFFLEVBQUU7SUFFN0YsTUFBTSxDQUFDLEdBQUcsRUFBRTtRQUVWLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUVyQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7Z0JBRTVDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFFbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO29CQUUzQyxPQUFPLENBQUM7d0JBQ04sYUFBYTt3QkFDYixPQUFPO3FCQUNSLENBQUMsQ0FBQztpQkFFSixDQUFDLENBQUM7YUFFSixDQUFDLENBQUM7U0FFSixDQUFDLENBQUM7S0FFSixDQUFDO0NBRUgsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlY0FwaVNlcnZpY2UgfSBmcm9tICcuLy4uL2FwaS9kZWNvcmEtYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVjQ29uZmlndXJhdGlvblNlcnZpY2UgfSBmcm9tICcuLy4uL2NvbmZpZ3VyYXRpb24vY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IERlY0FwcEluaXRpYWxpemVyID0gKGRlY0NvbmZpZzogRGVjQ29uZmlndXJhdGlvblNlcnZpY2UsIGRlY0FwaTogRGVjQXBpU2VydmljZSkgPT4ge1xuXG4gIHJldHVybiAoKSA9PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICBkZWNDb25maWcubG9hZENvbmZpZygpLnRoZW4oKGNvbmZpZ3VyYXRpb24pID0+IHtcblxuICAgICAgICBkZWNBcGkuaGFuZFNoYWtlKCkudGhlbigoYWNjb3VudCkgPT4ge1xuXG4gICAgICAgICAgY29uc29sZS5sb2coJ0RlY0FwcEluaXRpYWxpemVyIGhhbmRTaGFrZScpO1xuXG4gICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgICAgICAgYWNjb3VudCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG5cbiAgICB9KTtcblxuICB9O1xuXG59O1xuIl19