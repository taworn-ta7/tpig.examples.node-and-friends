@ECHO OFF
FOR /D %%d IN (
    with-sequelize
    with-mongoose
    with-express
    with-express-sequelize
    with-express-sequelize-authen
    with-express-sequelize-authen-tests
    with-express-mongoose
    with-express-mongoose-authen
    with-express-mongoose-authen-tests
    with-i18next
) DO (
    PUSHD %%d
    ECHO %%d
    npm i
    POPD %%d
)
