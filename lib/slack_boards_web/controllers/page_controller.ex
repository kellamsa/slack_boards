defmodule SlackBoardsWeb.PageController do
  use SlackBoardsWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
