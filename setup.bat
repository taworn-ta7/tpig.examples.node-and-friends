@ECHO OFF
FOR /D %%d IN (
    with-express
    with-express-mongoose
    with-express-sequelize
    with-express-sequelize-authen
    with-express-sequelize-authen-tests
    with-mongoose
    with-sequelize
) DO (
    PUSHD %%d
    ECHO %%d
    npm i
    POPD %%d
)
