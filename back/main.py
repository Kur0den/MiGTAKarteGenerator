from fastapi import FastAPI, APIRouter

router = APIRouter()


@router.get("/hw")
async def hello_world():
    return {"message": "Hello World"}


@router.get("/get_doctor")
async def get_doctor(name: str | None = None):
    # ここでデータベースからデータを取得する

    # 結果を返す際は表示される内容のリストを返す
    data = [
        "たなか",
        "さとう",
        "すずき",
    ]
    return data


@router.get("/get_user")
async def get_doctor(name: str | None = None):
    # ここでデータベースからデータを取得する

    # 結果を返す際は表示される内容のリストを返す
    data = [
        "たなか",
        "さとう",
        "すずき",
    ]
    return data


app = FastAPI()

app.include_router(router, prefix="/api")
