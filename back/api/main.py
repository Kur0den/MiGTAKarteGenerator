from fastapi import FastAPI, APIRouter

get_router = APIRouter()
app = FastAPI()


@app.get("/hw")
async def hello_world():
    return {"message": "Hello World"}


@get_router.get("/get_doctor")
async def get_doctor(name: str | None = None):
    # ここでデータベースからデータを取得する

    # 結果を返す際は表示される内容のリストを返す
    data = [
        "たなか",
        "さとう",
        "すずき",
    ]
    return data


@get_router.get("/get_user")
async def get_user(name: str | None = None):
    # ここでデータベースからデータを取得する

    # 結果を返す際は表示される内容のリストを返す
    data = [
        "たなか",
        "さとう",
        "すずき",
    ]
    return data


app.include_router(get_router, prefix="/api/get")
