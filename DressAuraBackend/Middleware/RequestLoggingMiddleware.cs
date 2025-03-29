using System.Text;

namespace DressAuraBackend.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Log basic request details: method, URL, and headers
            _logger.LogInformation("Incoming request: {Method} {Url} {Headers}",
                context.Request.Method,
                context.Request.Path,
                context.Request.Headers);

            // Log cookies if there are any
            if (context.Request.Cookies.Any())
            {
                foreach (var cookie in context.Request.Cookies)
                {
                    _logger.LogInformation("Cookie: {CookieName} = {CookieValue}", cookie.Key, cookie.Value);
                }
            }
            else
            {
                _logger.LogInformation("No cookies in the request.");
            }

            // Log the Bearer token from the Authorization header if it exists
            if (context.Request.Headers.ContainsKey("Authorization"))
            {
                var authorizationHeader = context.Request.Headers["Authorization"].ToString();
                if (authorizationHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                {
                    var token = authorizationHeader.Substring("Bearer ".Length).Trim();
                    _logger.LogInformation("Bearer token: {Token}", token); // Be cautious with logging sensitive data
                }
            }
            else
            {
                _logger.LogInformation("No Authorization header present.");
            }

            // If needed, you can log the request body (though be careful about large payloads).
            // For example, for JSON bodies:
            context.Request.EnableBuffering(); // This is necessary to read the request body without consuming it
            using (var reader = new StreamReader(context.Request.Body, Encoding.UTF8, true, 1024, leaveOpen: true))
            {
                var body = await reader.ReadToEndAsync();
                _logger.LogInformation("Request body: {Body}", body);

                // Reset the stream position to 0 so the next middleware (e.g., controllers) can read it.
                context.Request.Body.Position = 0;
            }

            // Call the next middleware in the pipeline
            await _next(context);
        }
    }
}
