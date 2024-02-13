from fastapi import FastAPI, APIRouter

router = APIRouter()


@router.get("/hw")
async def root():
    return {"message": "Hello World"}


app = FastAPI()

app.include_router(router, prefix="/api")
