FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 8080

# Copy csproj and restore as distinct layers
COPY "Reactivities.sln" .
COPY "API/*.csproj" "API/"
COPY "Application/*.csproj" "Application/"
COPY "Domain/*.csproj" "Domain/"
COPY "Infrastructure/*.csproj" "Infrastructure/"
COPY "Persistence/*.csproj" "Persistence/"

RUN dotnet restore "Reactivities.sln"

# Copy everything else and build
COPY . .
WORKDIR /app
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "API.dll"]
