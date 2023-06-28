using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalR_MiniGame.AppCode.Hubs
{
    public class GameHub : Hub
    {
        public async Task SendPosition(string json)
        {
            await Clients.Others.SendAsync("ReceivePosition", json);
        }
    }
}
