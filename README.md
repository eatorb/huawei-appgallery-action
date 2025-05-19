# Huawei AppGallery Deploy Action 🚀

This GitHub Action automates the process of uploading and publishing Android applications to Huawei AppGallery Connect.

## ✨ Features

- Upload APK files to Huawei AppGallery
- Seamless integration with GitHub CI/CD workflows
- Optional automatic submission for review
- Written in TypeScript for reliability and type safety
-  Detailed logging for easy troubleshooting

## 📋 Usage

Add this action to your GitHub workflow to deploy your Android app to Huawei AppGallery:

```yaml
name: Deploy to Huawei AppGallery

on:
  push:
    tags:
      - 'v*'  # Trigger on version tags

jobs:
  deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # Build your APK (replace with your actual build steps)
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'
          cache: 'gradle'

      - name: Build APK
        run: ./gradlew assembleRelease

      # Deploy to Huawei AppGallery
      - name: Deploy to Huawei AppGallery
        uses: eatorb/huawei-appgallery-action@v1.0.0
        with:
          client-id: ${{ secrets.HUAWEI_CLIENT_ID }}
          client-secret: ${{ secrets.HUAWEI_CLIENT_SECRET }}
          app-id: ${{ secrets.HUAWEI_APP_ID }}
          file-path: app/build/outputs/apk/release/app-release.apk
          submit: 'true'  # Set to 'false' to skip submission for review
```

## ⚙️ Inputs

| Input | Description | Required | Default |
|:------|:------------|:---------|:--------|
| `client-id` | AppGallery Connect API Client ID | ✅ | - |
| `client-secret` | AppGallery Connect API Client Secret | ✅ | - |
| `app-id` | AppGallery Connect App ID | ✅ | - |
| `file-path` | Path to the APK file to upload | ✅ | - |
| `submit` | Submit for review after upload | ❌ | `false` |

## 🔑 Setting up Huawei AppGallery API Access

To use this action, you'll need to set up API credentials in Huawei AppGallery Connect:

1. Log in to [AppGallery Connect](https://developer.huawei.com/consumer/en/console)
2. Go to "Users and permissions" > "API key"
3. Create a new API client with the following permissions:
    - App Management
    - Publishing API
4. Make note of the Client ID and Client Secret
5. Go to "My apps" and select your app to find the App ID

## 🔐 Repository Secrets

Add the following secrets to your GitHub repository:

- `HUAWEI_CLIENT_ID`: Your AppGallery Connect API Client ID
- `HUAWEI_CLIENT_SECRET`: Your AppGallery Connect API Client Secret
- `HUAWEI_APP_ID`: Your AppGallery Connect App ID


## ❓ Troubleshooting

### Common Issues

- **403 Forbidden error**: Verify that your Client ID and Client Secret are correct and have the proper permissions.
- **File upload failures**: Check that your APK file exists at the specified path and is a valid APK.
- **API errors**: Ensure your App ID is correct and belongs to your account.

### Debug Logging

For more verbose logging, enable debug logs in your GitHub Actions workflow:

1. Go to your repository settings
2. Navigate to "Secrets and variables" > "Actions"
3. Create a new repository variable:
    - Name: `ACTIONS_STEP_DEBUG`
    - Value: `true`

## 📋 Example Workflow with Build and Deploy

Here's a complete example that builds and deploys an Android app:

```yaml
name: Build and Deploy

on:
  push:
    tags:
      - 'v*'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Set up JDK
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'
          cache: 'gradle'
          
      - name: Grant execute permission for gradlew
        run: chmod +x gradlew
        
      - name: Build with Gradle
        run: ./gradlew assembleRelease
        
      - name: Deploy to Huawei AppGallery
        uses: eatorb/huawei-appgallery-action@v1.0.0
        with:
          client-id: ${{ secrets.HUAWEI_CLIENT_ID }}
          client-secret: ${{ secrets.HUAWEI_CLIENT_SECRET }}
          app-id: ${{ secrets.HUAWEI_APP_ID }}
          file-path: app/build/outputs/apk/release/app-release.apk
          submit: 'true'
```

## 📜 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Submit a pull request

---
<p align="center">
  Made with ❤️ by <a href="https://github.com/eatorb">eatorb</a>
</p>
```