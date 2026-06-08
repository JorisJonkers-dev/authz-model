import org.gradle.api.publish.maven.MavenPublication
import org.gradle.jvm.toolchain.JavaLanguageVersion

plugins {
    kotlin("jvm")
    `maven-publish`
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
    withJavadocJar()
    withSourcesJar()
}

kotlin {
    jvmToolchain(21)
}

sourceSets {
    main {
        kotlin.srcDir("src/generated/kotlin")
    }
}

dependencies {
    testImplementation(kotlin("test-junit5"))
}

tasks.test {
    useJUnitPlatform()
}

publishing {
    publications {
        create<MavenPublication>("mavenJava") {
            from(components["java"])
            artifactId = "authz-model"
            pom {
                name.set("authz-model")
                description.set("Shared authorization vocabulary constants for ExtraToast consumers")
                url.set("https://github.com/ExtraToast/authz-model")
                licenses {
                    license {
                        name.set("MIT")
                        url.set("https://opensource.org/licenses/MIT")
                    }
                }
                developers {
                    developer {
                        id.set("extratoast")
                        name.set("ExtraToast")
                    }
                }
                scm {
                    connection.set("scm:git:https://github.com/ExtraToast/authz-model.git")
                    developerConnection.set("scm:git:ssh://git@github.com:ExtraToast/authz-model.git")
                    url.set("https://github.com/ExtraToast/authz-model")
                }
            }
        }
    }
    repositories {
        maven {
            name = "GitHubPackages"
            url = uri("https://maven.pkg.github.com/ExtraToast/authz-model")
            credentials {
                username = providers.environmentVariable("GITHUB_ACTOR").orNull
                password = providers.environmentVariable("GITHUB_TOKEN").orNull
            }
        }
    }
}
