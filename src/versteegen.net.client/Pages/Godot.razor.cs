using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace versteegen.net.client.Pages
{
    public partial class Godot
    {
        [Inject]
        public IJSRuntime JSRuntime { get; set; }

        public async void StartGodot()
        {
            var cancelTok = new CancellationToken();
            await JSRuntime.InvokeVoidAsync("launchGodot", cancelTok,"canvas");
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (!firstRender)
            {
                return;
            }
            var cancelTok = new CancellationToken();
            await JSRuntime.InvokeVoidAsync("launchGodot", cancelTok, "canvas");
        }
    }
}
