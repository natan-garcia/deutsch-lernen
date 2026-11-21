# Build context: repository root (see docker-compose.yml)
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY api/ api/
RUN dotnet publish api/src/DeutschLernen.Api -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
COPY content/ /content/
ENV ASPNETCORE_URLS=http://+:8080 \
    ConnectionStrings__Default="Data Source=/data/deutsch-lernen.db" \
    Content__PackagesPath=/content/packages
VOLUME /data
EXPOSE 8080
ENTRYPOINT ["dotnet", "DeutschLernen.Api.dll"]
