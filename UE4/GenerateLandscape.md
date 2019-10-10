[TOP]({{ site.reseturl }}) > UE4 GenerateLandscape

![sample]({{ site.reseturl }}/image/genter/gen_land.gif)

[ソースコード](https://github.com/pto8913/UE4_memo/tree/master/GenerateLandscapeFromCpp)

本文中にもソースコードは出てきます。<br>

> # 導入

---

![sample]({{ site.reseturl }}/image/genter/GenTerNewPro.png)

うまく作成できなかった場合は<br>
ディレクトリ名やファイル名の日本語を英語表記にするとできるはずです。<br>

> ### 新規C++クラスの作成

---

![sample]({{ site.reseturl }}/image/genter/GenTerNewCpp.png)

**今回は`BluePrintFunctionLibrary`を使用** <br>

![sample]({{ site.reseturl }}/image/GenTerBPFL.png)

**ここで付けた名前が`Class`名になります**<br>

![sample]({{ site.reseturl }}/image/genter/GenTerBPFL2.png)

> ### Visual Studioに移動してコードを書いていきます

---

**`xxx.Build.cs`に移動して`Landscape` `LandscapeEditor`を追加**<br>

![sample]({{ site.reseturl }}/image/genter/GenTerBuild.png)

**追加したらファイルの生成**<br>

![sample]({{ site.reseturl }}/image/genter/GenTerGenFile.png)

**ファイルの生成が終わったらそれぞれxxx.h xxx.cppに追加**<br>

`BPFL_GenerateLandscape.h`

```cpp
#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "BPFL_GenerateLandscape.generated.h"

UCLASS()
// このMYPROJECT2の部分は自分で作ったプロジェクト名にしようね
class MYPROJECT2_API UBPFL_GenerateLandscape : public UBlueprintFunctionLibrary
{
    GENERATED_BODY()

public:
    UFUNCTION(BlueprintCallable, Category = LandscapeTest, meta = (HidePin = "worldContextObject_", DefaultToSelf = "worldContextObject_"))
        static bool GenerateLandscape(const UObject* worldContextObject_);
};
```

`BPFL_GenerateLandscape.cpp`

```cpp
#include "BPFL_GenerateLandscape.h"

#include "EngineUtils.h"
#include "Landscape.h"
#include "LandscapeInfo.h"
#include "LandscapeEditorUtils.h"

bool UBPFL_GenerateLandscape::GenerateLandscape(const UObject* worldContextObject_)
{
    FActorSpawnParameters params;

    params.bDeferConstruction = false;
    params.ObjectFlags = EObjectFlags::RF_NoFlags;
    params.SpawnCollisionHandlingOverride = ESpawnActorCollisionHandlingMethod::AlwaysSpawn;

    UWorld* world = worldContextObject_->GetWorld();

    FVector location(0.0f, 0.0f, 0.0f);
    FRotator rotator(0.0f, 0.0f, 0.0f);

    ALandscape* landscape = world->SpawnActor<ALandscape>(location, rotator, params);
    ALandscapeProxy* proxy = Cast<ALandscapeProxy>(landscape);

    int section_size = 63;
    int section_per_component = 1;
    // 実はここから
    int component_x = 8;
    int component_y = 8;
    int quads_per_component = section_per_component * section_size;
    int size_x = component_x * quads_per_component + 1;
    int size_y = component_y * quads_per_component + 1;
    // ここまではいらなくて
    // heightmapのsize_x, size_yを任意の大きさに変えると
    // Landscapeの大きさをかなり自由に決められる
    // 値を入れる。
    TArray<uint16> heightmap;
    heightmap.Init(0, size_x * size_y);
    /*for (int x = 0; x < size_x; ++x) {
        for (int y = 0; y < size_y; ++y) {
            heightmap[y + x * size_y] = x * y;
        }
    }*/

    TArray<FLandscapeImportLayerInfo> infos;
    proxy->Import(FGuid::NewGuid(), 0, 0, size_x - 1, size_y - 1, section_per_component, section_size, heightmap.GetData(), nullptr, infos, ELandscapeImportAlphamapType::Additive);
    // ここでLandscapeのスケールを変えることもできる
    // landscape->SetActorScale3D(FVector(256, 256, 256));
    // 
    return true;
}
```

**`heightmap`の部分をいじると`Landscape`の形状を変えられます。** <br>

**`section_size`や`component_size`については公式のドキュメントを見てください。**<br>

**(配列の大きさに合わせて`Landscape`を作るのなら`section_size`と`section_per_component`以外いらないです)**<br>

[ランドスケープの作成](https://docs.unrealengine.com/ja/Engine/Landscape/Creation/index.html)<br>
[ランドスケープのテクニカルガイド](https://docs.unrealengine.com/ja/Engine/Landscape/TechnicalGuide/index.html)<br>

> ### UE4に戻ります

---

**戻ったらコンパイルを押します**<br>
![sample]({{ site.reseturl }}/image/genter/GenTerComp.png)

**コンパイルが終わったらブループリントアクターを作成**<br>
![sample]({{ site.reseturl }}/image/genter/GenTerBPActor.png)

![sample]({{ site.reseturl }}/image/genter/GenTerBPActor2.png)

![sample]({{ site.reseturl }}/image/genter/GenTerBPActor3.png)

![sample]({{ site.reseturl }}/image/genter/GenTerBPActor4.png)

![sample]({{ site.reseturl }}/image/genter/GenTerBPActor5.png)

![sample]({{ site.reseturl }}/image/genter/GenTerBPActor6.png)

![sample]({{ site.reseturl }}/image/genter/GenTerBPActor7.png)

![sample]({{ site.reseturl }}/image/genter/GenTerBPActor8.png)

![sample]({{ site.reseturl }}/image/genter/GenTerBPActor9.png)

ここまでだと削除ができないので、新しく
`DestroyLandscape`クラスを作って以下のコードをコピペしてください。

```cpp
// write by pto8913

#include "DestroyLandscape.h"

#include "EngineUtils.h"
#include "Landscape.h"
#include "LandscapeInfo.h"
#include "LandscapeEditorUtils.h"
#include "Kismet/GameplayStatics.h"

bool UDestroyLandscape::DestroyLandscape(const UObject* worldContextObject_) {
	UWorld* world = worldContextObject_->GetWorld();

	TArray<AActor*> FoundActors;
	UGameplayStatics::GetAllActorsOfClass(world, ALandscape::StaticClass(), FoundActors);

	for (auto actor : FoundActors) {
		world->DestroyActor(actor);
		return true;
	}
	return false;
}
```

```cpp
#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "DestroyLandscape.generated.h"

UCLASS()
class MYPROJECT2_API UDestroyLandscape : public UBlueprintFunctionLibrary
{
	GENERATED_BODY()
	
public:
	UFUNCTION(BlueprintCallable, Category = FoliageTest, meta = (HidePin = "worldContextObject_", DefaultToSelf = "worldContextObject_"))
		static bool DestroyLandscape(const UObject* worldContextObject_);
	
};
```
`GenerateLandscape`クラスと同じ流れで作ってください。<br>
__古いものから順番に削除されるので気を付けて下さい__ <br>
指定したものを削除したいならタグをつけてやる方法がいいかも？ <br>
僕ではできなかったのでできた方いましたら教えてください。

<br>

> # 参考

---

[UnrealEnginePython Landscape_API](https://github.com/20tab/UnrealEnginePython/blob/master/docs/Landscape_API.md)<br>
[UEPyActor.cpp](https://github.com/20tab/UnrealEnginePython/blob/master/Source/UnrealEnginePython/Private/UObject/UEPyActor.cpp#L855) Line 855~<br>
[UEPyEditor.cpp](https://github.com/20tab/UnrealEnginePython/blob/master/Source/UnrealEnginePython/Private/UEPyEditor.cpp#L2354) Line 2354~<br>
[UEPyLandscape.cpp](https://github.com/20tab/UnrealEnginePython/blob/master/Source/UnrealEnginePython/Private/UObject/UEPyLandscape.cpp#L39) Line 39~<br>
[[UnrealC++]LandscapeのHeightmapをC++から変更する](http://unwitherer.blogspot.com/2017/07/unrealclandscapeheightmapc.html) <- Note: Japanese Ref <br>

[Qiitaのほうで書いた記事](https://qiita.com/pto8913/items/86bb2e080c8c7695e0b9)


[トップページに戻る]({{ site.reseturl }})