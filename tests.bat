@ECHO OFF
FOR /D %%d IN (
    with-sequelize
    with-mongoose
    with-express
    with-express-sequelize
    with-express-sequelize-authen
    with-express-sequelize-authen-tests
    with-express-mongoose
) DO (
    PUSHD %%d
    ECHO %%d
    npm test
    POPD %%d
)
