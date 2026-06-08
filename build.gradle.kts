plugins {
    kotlin("jvm") version "2.3.21" apply false
}

val releaseVersion =
    providers.gradleProperty("version")
        .orElse(
            providers.environmentVariable("GITHUB_REF_NAME")
                .map { it.removePrefix("v") },
        )
        .orElse("0.1.0-SNAPSHOT")

allprojects {
    group = "com.extratoast"
    version = releaseVersion.get()
}
