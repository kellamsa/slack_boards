defmodule SlackBoardsWeb.EmojiChannel do
  use Phoenix.Channel

  def join("emoji:all", _message, socket) do
    {:ok, socket}
  end
end
