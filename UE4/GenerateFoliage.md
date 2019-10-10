[TOP]({{ site.reseturl }}) > UE4 GenerateFoliage

![sample]({{ site.reseturl }}/image/genfol/gen_foli.gif)

[ソースコード](https://github.com/pto8913/UE4_memo/tree/master/GenerateFoliage)

本文中にもソースコードは出てきます。<br>

# 導入

![sample]({{ site.reseturl }}/image/genfol/GenTerNewPro.png)

**うまく作成できなかった場合は**<br>
**ディレクトリ名やファイル名の日本語を英語表記にするとできるはずです。**<br>

### 新規C++クラスの作成

![sample]({{ site.reseturl }}/image/genfol/GenTerNewCpp.png)

**今回はActorを使います**

![sample]({{ site.reseturl }}/image/genfol/GenFolAc.png)

**ここで付けた名前がClass名になります**<br>

![sample]({{ site.reseturl }}/image/genfol/GenFolAc2.png)

### Visual Studioに移動してコードを書いていきます

**`xxx.Build.cs`に移動して`Foliage`を追加**<br>

![sample]({{ site.reseturl }}/image/genfol/GenFolBuild.png)

**追加したらファイルの生成**<br>

![sample]({{ site.reseturl }}/image/genfol/GenTerGenFile.png)

**ファイルの生成が終わったらそれぞれxxx.h xxx.cppに追加**<br>

`GenerateFoliageActor.h`<br>

```cpp
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "GenerateFoliageActor.generated.h"

UCLASS()
class MYPROJECT2_API AGenerateFoliageActor : public AActor
{
    GENERATED_BODY()

public:
    // Sets default values for this actor's properties
    AMyLevelScriptActor(const FObjectInitializer& ObjectInitializer);


    virtual void BeginPlay() override;


    UStaticMesh* MyStaticMesh;
};
```

`GenerateFoliageActor.cpp`
```cpp
#include "GenerateFoliageActor.h"
#include "EngineUtils.h"
#include "Runtime/Foliage/Public/InstancedFoliageActor.h"
#include "Runtime/CoreUObject/Public/UObject/ConstructorHelpers.h"

AGenerateFoliageActor::AGenerateFoliageActor(const FObjectInitializer& ObjectInitializer) : Super(ObjectInitializer) {
    static ConstructorHelpers::FObjectFinder <UStaticMesh> MyMeshObj(TEXT("Your object path"));
    MyStaticMesh = MyMeshObj.Object;
}

void AGenerateFoliageActor::BeginPlay() {
    Super::BeginPlay();

    TActorIterator<AInstancedFoliageActor> foliageIterator(GetWorld());
    AInstancedFoliageActor* foliageActor = *foliageIterator;

    UInstancedStaticMeshComponent* meshComponent;

    TArray<UInstancedStaticMeshComponent*> components;
    foliageActor->GetComponents<UInstancedStaticMeshComponent>(components);

    if (components.Num() > 0){
        // ワールド内にすでにFoliageActorがあるならこっち
        meshComponent = components[0];
    }else{
        // なかったら新しく
        meshComponent = NewObject<UInstancedStaticMeshComponent>(foliageActor, UInstancedStaticMeshComponent::StaticClass(), NAME_None, RF_Transactional);
        meshComponent->AttachToComponent(foliageActor->GetRootComponent(), FAttachmentTransformRules::KeepWorldTransform);
        meshComponent->SetStaticMesh(MyStaticMesh);
        meshComponent->RegisterComponent();
    }
    FTransform transform = FTransform();
    /*
    // SetScale3Dは書く必要はないけど書けるよ～って意味で書いておく
    transform.SetLocation(FVector(0.0f, 0.0f, 20.f));
    transform.SetScale3D(FVector(0.5f, 0.5f, 0.5f));
    meshComponent->AddInstance(transform);
    */
    for (int32 x = 0; x < 5; x++)
    {
        for (int32 y = 0; y < 5; y++)
        {
            transform.SetLocation(FVector(1000.f * x, 1000.f * y, 0.f));
            transform.SetScale3D(FVector(0.5f, 0.5f, 0.5f));
            meshComponent->AddInstance(transform);
        }
    }
}
```

**オブジェクト(アセット？)のパスはオブジェクトを右クリックするとリファレンスのコピーしそれを使う**<br>

### UE4に戻ります

**戻ったらコンパイルを押します**<br>
![sample]({{ site.reseturl }}/image/genfol/GenTerComp.png)

**コンパイルが終ったら`Actor`を画面内に入れる**<br>

![sample]({{ site.reseturl }}/image/genfol/GenFolAc3.png)

**プレイを押すと木が生えます**<br>
**草でもできるはず**<br>

## `GenerateLandscape`の時のようにエディタでボタンを押して生成したい場合

[GenerateLandscape]({{ site.reseturl }}/GenerateLandscape)<br>ここを見ながら[ソースコード](https://github.com/pto8913/UE4_memo/tree/master/GenerateFoliage)の`BPFL_~`を追加してください。<br>
**`BPFL`版を使う際にはワールド上に一つ以上**<br>
**`Foliage`のオブジェクトを置いていないとクラッシュするので注意してください**<br>

エディタ上でランダムに木を生やしたりするときに便利かも？<br>
通常は手動で生やしたほうが楽な気がする。<br>


[Qiitaのほうで書いた記事](https://qiita.com/pto8913/items/bf33886e5bbc519fe78f)

[トップページに戻る]({{ site.reseturl }})